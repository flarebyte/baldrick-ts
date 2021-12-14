import { PackageJson, CoreProject, FieldStatus, Todo } from './model';
import { copyDependencies, copyScripts } from './package-copy';
import { convertPackageToStatus } from './package-status';
import { statusToTodo, trimString, trimStringArray } from './utils';

const minNodeVersion = 14;
const fixme = 'fixme';

const trimPackageJson = (pj: PackageJson): PackageJson => ({
  name: trimString(pj.name),
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
  license: trimString(pj.license),
  homepage: trimString(pj.homepage),
  repository: {
    type: trimString(pj.repository.type),
    url: trimString(pj.repository.url),
  },
  type: 'module',
  exports: trimString(pj.exports),
  types: trimString(pj.types),
  main: trimString(pj.main),
  typings: trimString(pj.typings),
  files: trimStringArray(pj.files),
  bin: pj.bin,
  engines: {
    node: trimString(pj.engines.node),
  },
  scripts: copyScripts(pj.scripts),
  module: trimString(pj.module),
  dependencies: copyDependencies(pj.dependencies),
  devDependencies: copyDependencies(pj.devDependencies),
  peerDependencies: copyDependencies(pj.peerDependencies),
});

const normalizeOpenSourcePackage = (
  coreProject: CoreProject,
  packageJson: PackageJson
): PackageJson => ({
  ...packageJson,
  name: coreProject.name,
  homepage: `https://github.com/${coreProject.githubAccount}/${coreProject.name}`,
  repository: {
    type: 'git',
    url: `https://github.com/${coreProject.githubAccount}/${coreProject.name}.git`,
  },
  type: 'module',
  exports: './dist/src/cli.mjs',
  main: 'dist/index.js',
  typings: 'dist/index.d.ts',
  types: 'dist/src',
  files: ['dist', 'src'],
  bin: {},
  engines: {
    node: `>=${minNodeVersion}`,
  },
  scripts: {
    start: 'baldrick test check',
    lint: 'baldrick lint check',
    'lint:fix': 'baldrick lint fix',
    test: 'baldrick test check',
    'test:fix': 'baldrick test fix',
    'test:cov': 'baldrick test cov',
    build: 'tsc --outDir dist',
  },
  module: `dist/${coreProject.name}.esm.js`,
});

const normalizeOtherPackage = (
  coreProject: CoreProject,
  packageJson: PackageJson
): PackageJson => ({ ...normalizeOpenSourcePackage(coreProject, packageJson) });

const normalizePackage = (
  coreProject: CoreProject,
  packageJson: PackageJson
): PackageJson =>
  coreProject.licenseType === 'MIT'
    ? normalizeOpenSourcePackage(coreProject, packageJson)
    : normalizeOtherPackage(coreProject, packageJson);

const fixAutomatically = (
  coreProject: CoreProject,
  packageJson: PackageJson
): PackageJson => {
  const trimmed = trimPackageJson(packageJson);
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

const suggestTasksToDo = (
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

export { fixAutomatically, suggestTasksToDo };
