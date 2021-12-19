import { getNpmScripts } from './markdown-maintenance.js';
import {
  PackageJson,
  CoreProject,
  FieldStatus,
  Todo,
  CustomizedPackageJson,
  minimumNodeVersion,
} from './model.js';
import { copyDependencies, copyScripts } from './package-copy.js';
import { convertPackageToStatus } from './package-status.js';
import { statusToTodo, trimString, trimStringArray } from './utils.js';

const fixme = 'fixme';

const trimPackageJson = (pj: CustomizedPackageJson): CustomizedPackageJson => ({
  description: trimString(pj.description),
  keywords: trimStringArray(pj.keywords),
  author:
    typeof pj.author === 'string'
      ? {
          name: trimString(pj.author),
          url: `https://github.com/${fixme}`,
        }
      : pj.author,
  version: trimString(pj.version),
  scripts: copyScripts(pj.scripts),
  dependencies: copyDependencies(pj.dependencies),
  devDependencies: copyDependencies(pj.devDependencies),
  peerDependencies: copyDependencies(pj.peerDependencies),
});

const normalizeOpenSourcePackage = (
  coreProject: CoreProject,
  customized: CustomizedPackageJson
): PackageJson => {
  const isCli = coreProject.feature.includes('cli');
  const mainExport = isCli ? 'cli' : 'index';
  const bin: { [key: string]: string } = isCli
    ? Object.fromEntries([[coreProject.bin, 'dist/src/cli.mjs']])
    : {};
  return {
    name: coreProject.name,
    description: customized.description,
    keywords: customized.keywords,
    version: customized.version,
    author: customized.author,
    license: coreProject.license,
    homepage: `https://github.com/${coreProject.githubAccount}/${coreProject.name}`,
    repository: {
      type: 'git',
      url: `https://github.com/${coreProject.githubAccount}/${coreProject.name}.git`,
    },
    type: 'module',
    exports: {
      '.': {
        import: `./dist/src/${mainExport}.mjs`,
        default: `./dist/src/${mainExport}.mjs`,
        types: './dist/src',
      },
      './package.json': { default: './package.json' },
    },
    files: ['dist', 'src'],
    bin,
    engines: {
      node: `>=${minimumNodeVersion}`,
    },
    scripts: {
      ...getNpmScripts(coreProject),
    },
    dependencies: customized.dependencies,
    devDependencies: customized.devDependencies,
    peerDependencies: customized.peerDependencies,
  };
};
export const defaultCustomizedPackageJson: CustomizedPackageJson = {
  description: fixme,
  keywords: [],
  version: '0.1.0',
  author: fixme,
  scripts: {},
  dependencies: {},
  devDependencies: {},
  peerDependencies: {},
};

const normalizeOtherPackage = (
  coreProject: CoreProject,
  customized: CustomizedPackageJson
): PackageJson => ({ ...normalizeOpenSourcePackage(coreProject, customized) });

const normalizePackage = (
  coreProject: CoreProject,
  customized: CustomizedPackageJson
): PackageJson =>
  coreProject.license === 'MIT'
    ? normalizeOpenSourcePackage(coreProject, customized)
    : normalizeOtherPackage(coreProject, customized);

export const fixAutomatically = (
  coreProject: CoreProject,
  customized: CustomizedPackageJson
): PackageJson => {
  const trimmed = trimPackageJson(customized);
  const fixed = normalizePackage(coreProject, trimmed);
  return fixed;
};

const keyStatsToTodo = (keyStats: [string, FieldStatus]): Todo => {
  const [key, stats] = keyStats;
  return {
    description: `Key ${key} of package.json`,
    status: statusToTodo(stats),
  };
};

const keepNotOk = (keyStats: [string, FieldStatus]): boolean =>
  keyStats[1] !== 'ok';

export const suggestTasksToDo = (
  coreProject: CoreProject,
  packageJson: PackageJson
): Todo[] => {
  const fixed = fixAutomatically(coreProject, packageJson);
  const packageStatus = convertPackageToStatus(packageJson, fixed);
  const results = Object.entries(packageStatus)
    .filter(keepNotOk)
    .map(keyStatsToTodo);
  return results;
};
