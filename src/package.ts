import {
  PackageJson,
  CoreProject,
  LicenseType,
  FieldStatus,
  Todo,
  ProjectConfig,
} from './model';
import {
  copyDependencies,
  copyScripts,
  packageToCoreProject,
} from './package-copy';
import { convertPackageToStatus } from './package-status';
import { statusToTodo, trimString, trimStringArray } from './utils';

const minNodeVersion = 12;
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
  main: trimString(pj.main),
  typings: trimString(pj.typings),
  files: trimStringArray(pj.files),
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
  main: 'dist/index.js',
  typings: 'dist/index.d.ts',
  files: ['dist', 'src'],
  engines: {
    node: `>=${minNodeVersion}`,
  },
  scripts: {
    start: 'tsdx watch',
    build: 'tsdx build',
    test: 'tsdx test',
    'test:cov': 'tsdx test --coverage',
    watch: 'tsdx watch',
    lint: 'tsdx lint src test',
    fix: 'tsdx lint src test --fix',
    prepare: 'tsdx build',
    size: 'size-limit',
    analyze: 'size-limit --why',
    docs: 'typedoc',
    'fix:main': 'prettier --write *.md *.json .github/workflows/*.yml',
    ready:
      'yarn fix;yarn fix:main;yarn lint;yarn test:cov;yarn build;yarn size;yarn docs',
    preversion: 'yarn lint;yarn test:cov;yarn size;',
    postversion: 'git push --tags',
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
  coreProject.licenseType === LicenseType.MIT
    ? normalizeOpenSourcePackage(coreProject, packageJson)
    : normalizeOtherPackage(coreProject, packageJson);

const fixAutomatically = (
  projectConfig: ProjectConfig,
  packageJson: PackageJson
): PackageJson => {
  const trimmed = trimPackageJson(packageJson);
  const coreProject = packageToCoreProject(projectConfig, packageJson);
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
  keyStats[1] !== FieldStatus.Ok;

const suggestTasksToDo = (
  projectConfig: ProjectConfig,
  packageJson: PackageJson
): Todo[] => {
  const fixed = fixAutomatically(projectConfig, packageJson);
  const packageStatus = convertPackageToStatus(packageJson, fixed);
  const results = Object.entries(packageStatus)
    .filter(keepNotOk)
    .map(keyStatsToTodo);
  return results;
};

export { fixAutomatically, suggestTasksToDo };
