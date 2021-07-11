const minNodeVersion = 12;

export interface PackageJson {
  name: string;
  description: string;
  keywords: string[];
  author: Author | string;
  version: string;
  license: string;
  homepage: string;
  repository: Repository;
  main: string;
  typings: string;
  files: string[];
  engines: Engines;
  scripts: Scripts;
  module: string;
  devDependencies: Dependencies;
  dependencies: Dependencies;
  peerDependencies: Dependencies;
}

export interface PackageKeyStats {
  key: string;
  countItems: number;
  stringLength: number;
}

export interface Author {
  name: string;
  url: string;
}

export interface Dependencies {
  [key: string]: string;
}

export interface Engines {
  node: string;
}

export interface Repository {
  type: string;
  url: string;
}

export interface Scripts {
  [key: string]: string;
}

enum LicenseType {
  MIT,
  Other,
}

enum ScaffoldingType {
  TsDx,
  Other,
}

enum PipelineType {
  Github,
  Other,
}

enum ProjectType {
  TsLib,
  TsCli,
  Other,
}

export interface CoreProject {
  name: string;
  githubAccount: string;
  licenseType: LicenseType;
  scaffoldingType: ScaffoldingType;
  pipelineType: PipelineType;
  projectType: ProjectType;
}

const trimString = (value: string | null | undefined): string =>
  value === null || value === undefined ? 'fixme' : value?.trim();
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

const copyPackageJson = (pj: PackageJson): PackageJson => ({
  name: trimString(pj.name),
  description: trimString(pj.description),
  keywords: trimStringArray(pj.keywords),
  author:
    typeof pj.author === 'string'
      ? {
          name: trimString(pj.author),
          url: 'https://github.com/fixme',
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

const fromString = (content: string): PackageJson => {
  const results: PackageJson = copyPackageJson(JSON.parse(content));
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
export {
  fromString,
  toString,
  packageToStats,
  packageToCoreProject,
  normalizePackage,
  defaultSizeLimit,
  defaultPrettier,
};
