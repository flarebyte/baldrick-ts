import isEqual from 'lodash.isequal';
import {
  Scripts,
  Dependencies,
  PackageJson,
  PackageKeyStats,
  CoreProject,
  LicenseType,
  PipelineType,
  ProjectType,
  ScaffoldingType,
  FieldStatus,
  PackageJsonStatusConverter,
  PackageJsonStatus,
  Author,
  Engines,
  Todo,
} from './model';

const minNodeVersion = 12;
const fixme = 'fixme';

const trimString = (value: string | null | undefined): string =>
  value === null || value === undefined ? fixme : value?.trim();
const trimStringArray = (values: string[] | null | undefined): string[] =>
  values === null || values === undefined ? [] : values.map(trimString);

const copyScripts = (scripts: Scripts): Scripts =>
  Object.fromEntries(
    Object.entries(scripts).map(keyVal => [
      trimString(keyVal[0]),
      trimString(keyVal[1]),
    ])
  );

const copyDependencies = (deps: Dependencies): Dependencies =>
  Object.fromEntries(
    Object.entries(
      deps === null || deps === undefined ? {} : deps
    ).map(keyVal => [trimString(keyVal[0]), trimString(keyVal[1])])
  );

const simpleCopyPackageJson = (pj: PackageJson): PackageJson => ({
  name: pj.name,
  description: pj.description,
  keywords: pj.keywords,
  author: pj.author,
  version: pj.version,
  license: pj.license,
  homepage: pj.homepage,
  repository: pj.repository,
  main: pj.main,
  typings: pj.typings,
  files: pj.files,
  engines: pj.engines,
  scripts: pj.scripts,
  module: pj.module,
  dependencies: pj.dependencies,
  devDependencies: pj.devDependencies,
  peerDependencies: pj.peerDependencies,
});

const fromString = (content: string): PackageJson => {
  const results: PackageJson = simpleCopyPackageJson(JSON.parse(content));
  return results;
};

const toString = (packageJson: PackageJson): string => {
  return JSON.stringify(packageJson, null, 2);
};

const toCountItems = (value: string | any): number =>
  typeof value === 'string'
    ? 1
    : typeof value === 'object'
    ? Object.keys(value).length
    : value === null || value === undefined
    ? 0
    : value.length;

const toStringLength = (value: string | any): number =>
  typeof value === 'string' ? value.length : 0;

const packageToStats = (packageJson: PackageJson): PackageKeyStats[] =>
  Object.entries(packageJson).map(keyValue => ({
    key: keyValue[0],
    countItems: toCountItems(keyValue[1]),
    stringLength: toStringLength(keyValue[1]),
  }));

const hasDependency = (name: string, dependencies: Dependencies): boolean =>
  Object.keys(dependencies).includes(name);

const packageToCoreProject = (
  githubAccount: string,
  packageJson: PackageJson
): CoreProject => ({
  name: packageJson.name,
  githubAccount,
  licenseType:
    packageJson.license === 'MIT' ? LicenseType.MIT : LicenseType.Other,
  scaffoldingType: hasDependency('tsdx', packageJson.devDependencies)
    ? ScaffoldingType.TsDx
    : ScaffoldingType.Other,
  pipelineType: PipelineType.Github,
  projectType: ProjectType.TsLib,
});

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
    type: trimString(pj?.repository.type),
    url: trimString(pj?.repository.url),
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
const normalizePackage = (
  coreProject: CoreProject,
  packageJson: PackageJson
): PackageJson =>
  coreProject.licenseType === LicenseType.MIT
    ? normalizeOpenSourcePackage(coreProject, packageJson)
    : packageJson;

const defaultSizeLimit = (coreProject: CoreProject) => [
  {
    path: `dist/${coreProject.name}.cjs.production.min.js`,
    limit: '5 KB',
  },
  {
    path: `dist/${coreProject.name}.esm.js`,
    limit: '5 KB',
  },
];
const defaultPrettier = {
  printWidth: 80,
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
};

const packConv: PackageJsonStatusConverter = {
  name: (value: string, fixed: string) =>
    value.length <3 ? FieldStatus.Todo : value === fixed ? FieldStatus.Ok : FieldStatus.Fixable,
  description: (value: string, fixed: string) =>
  value.length <3 ? FieldStatus.Todo : value === fixed ? FieldStatus.Ok : FieldStatus.Fixable,
  keywords: (value: string[], fixed: string[]) =>
    value.length === 0 ? FieldStatus.Todo : isEqual(value, fixed) ? FieldStatus.Ok : FieldStatus.Fixable,
  author: (value: Author | string) =>
    typeof value === 'string'
      ? FieldStatus.Todo
      : (value as Author).name.includes(fixme) ||
        (value as Author).url.includes(fixme)
      ? FieldStatus.Todo
      : FieldStatus.Ok,
  version: (value: string, fixed: string) =>
    value.length < 3 ? FieldStatus.Todo : value === fixed ? FieldStatus.Ok : FieldStatus.Fixable,
  license: (value: string, fixed: string) =>
    value.length < 2 ? FieldStatus.Todo : value === fixed ? FieldStatus.Ok : FieldStatus.Fixable,
  homepage: (value: string, fixed: string) =>
    value === fixed ? FieldStatus.Ok : FieldStatus.Fixable,
  repository: (value: string, fixed: string) =>
    value === fixed ? FieldStatus.Ok : FieldStatus.Fixable,
  main: (value: string, fixed: string) =>
    value === fixed ? FieldStatus.Ok : FieldStatus.Fixable,
  typings: (value: string, fixed: string) =>
    value === fixed ? FieldStatus.Ok : FieldStatus.Fixable,
  files: (value: string[], fixed: string[]) =>
    isEqual(value, fixed) ? FieldStatus.Ok : FieldStatus.Fixable,
  engines: (value: Engines, fixed: Engines) =>
    isEqual(value, fixed) ? FieldStatus.Ok : FieldStatus.Fixable,
  scripts: (value: Scripts, fixed: Scripts) =>
    isEqual(value, fixed) ? FieldStatus.Ok : FieldStatus.Fixable,
  module: (value: string, fixed: string) =>
    value === fixed ? FieldStatus.Ok : FieldStatus.Fixable,
  devDependencies: (_: Dependencies) => FieldStatus.Ok,
  dependencies: (_: Dependencies) => FieldStatus.Ok,
  peerDependencies: (_: Dependencies) => FieldStatus.Ok,
};

const convertPackageToStatus = (
  packageJson: PackageJson,
  fixedPackageJson: PackageJson
): PackageJsonStatus => ({
  name: packConv.name(packageJson.name, fixedPackageJson.name),
  description: packConv.description(
    packageJson.description,
    fixedPackageJson.description
  ),
  keywords: packConv.keywords(packageJson.keywords, fixedPackageJson.keywords),
  author: packConv.author(packageJson.author, fixedPackageJson.author),
  version: packConv.version(packageJson.version, fixedPackageJson.version),
  license: packConv.license(packageJson.license, fixedPackageJson.license),
  homepage: packConv.homepage(packageJson.homepage, fixedPackageJson.homepage),
  repository: packConv.repository(
    packageJson.repository,
    fixedPackageJson.repository
  ),
  main: packConv.main(packageJson.main, fixedPackageJson.main),
  typings: packConv.typings(packageJson.typings, fixedPackageJson.typings),
  files: packConv.files(packageJson.files, fixedPackageJson.files),
  engines: packConv.engines(packageJson.engines, fixedPackageJson.engines),
  scripts: packConv.scripts(packageJson.scripts, fixedPackageJson.scripts),
  module: packConv.module(packageJson.module, fixedPackageJson.module),
  devDependencies: packConv.devDependencies(
    packageJson.devDependencies,
    fixedPackageJson.devDependencies
  ),
  dependencies: packConv.dependencies(
    packageJson.dependencies,
    fixedPackageJson.dependencies
  ),
  peerDependencies: packConv.peerDependencies(
    packageJson.peerDependencies,
    fixedPackageJson.peerDependencies
  ),
});

const fixAutomatically = (githubAccount: string, packageJson: PackageJson): PackageJson => {
  const trimmed = trimPackageJson(packageJson)
  const coreProject = packageToCoreProject(githubAccount, packageJson)
  const fixed = normalizePackage(coreProject, trimmed)
  return fixed;
}

const statusToTodo = (status: FieldStatus): string => status === FieldStatus.Ok ? 'OK': status === FieldStatus.Todo ? '❌ TODO' : '🤖 FIX'
const keyStatsToTodo = (keyStats: [string, FieldStatus]): Todo => {
  const [key, stats] = keyStats
  return {
    description: `Key ${key} of package.json`,
    status: statusToTodo(stats)
  }
}

const keepNotOk = (keyStats: [string, FieldStatus]): boolean => keyStats[1] !== FieldStatus.Ok

const suggestTasksToDo = (githubAccount: string, packageJson: PackageJson): Todo[] => {
  const fixed = fixAutomatically(githubAccount, packageJson)
  const packageStatus = convertPackageToStatus(packageJson, fixed)
  const results = Object.entries(packageStatus).filter(keepNotOk).map(keyStatsToTodo)
  return results
}

export {
  fromString,
  toString,
  packageToStats,
  trimPackageJson,
  defaultSizeLimit,
  defaultPrettier,
  fixAutomatically,
  suggestTasksToDo
};
