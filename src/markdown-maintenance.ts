import { commandToMd } from './markdown';
import { InstallationType, MdCommand, MdPackage } from './model';

const tsdxPackage: MdPackage = {
  name: 'tsdx',
  installationType: InstallationType.NpmDev,
  description: 'Zero-config CLI for TypeScript package development',
  homepage: 'https://tsdx.io/',
  repository: {
    type: 'git',
    url: 'https://github.com/formium/tsdx',
  },
};

const yarnPackage: MdPackage = {
  name: 'yarn',
  installationType: InstallationType.NpmDev,
  description: 'Dependency management',
  homepage: 'https://classic.yarnpkg.com/en/',
  repository: {
    type: 'git',
    url: 'https://github.com/yarnpkg',
  },
};

const actPackage: MdPackage = {
  name: 'act',
  installationType: InstallationType.Brew,
  description: 'Run GitHub Actions locally',
  homepage: 'https://github.com/nektos/act',
  repository: {
    type: 'git',
    url: 'https://github.com/nektos/act',
  },
};

const lintCmd: MdCommand = {
  name: 'lint',
  title: 'Static code analysis',
  description: 'Find problems in Typescript code',
  motivation: 'Make the code more consistent and avoid bugs',
  context: 'Before compilation',
  run: 'yarn lint',
  partOf: tsdxPackage,
  examples: [],
};

const fixCmd: MdCommand = {
  name: 'fix',
  title: 'Static code analysis',
  description: 'Fix problems in Typescript code',
  motivation: 'Facilitate routine maintenance of code',
  context: 'Before compilation',
  run: 'yarn fix',
  partOf: tsdxPackage,
  examples: [],
};

const fixOtherCmd: MdCommand = {
  name: 'fix:other',
  title: 'Tidy up',
  description: 'Format in a pretty way various files outside source code',
  motivation: 'Facilitate routine maintenance of code',
  context: 'Before compilation',
  run: 'yarn fix:o',
  partOf: tsdxPackage,
  examples: [],
};

const testCmd: MdCommand = {
  name: 'test',
  title: 'Unit testing',
  description: 'Run the unit tests',
  motivation: 'Check that the units of code behave as intended',
  context: 'After compilation, before build',
  run: 'yarn test',
  partOf: tsdxPackage,
  examples: [],
};

const watchCmd: MdCommand = {
  name: 'watch',
  title: 'Unit testing watching',
  description:
    'Watch the source code for changes and run the unit tests accordingly',
  motivation: 'Know if the latest changes still satisfies the tests',
  context: 'After compilation, before build',
  run: 'yarn watch',
  partOf: tsdxPackage,
  examples: [],
};

const testCovCmd: MdCommand = {
  name: 'test:cov',
  title: 'Unit testing code coverage',
  description: 'Verify the extent to which the code has been executed',
  motivation: 'Ensure that every code branch and function is executed ',
  context: 'After compilation, before build',
  run: 'yarn test:cov',
  partOf: tsdxPackage,
  examples: [],
};

const prepareCmd: MdCommand = {
  name: 'prepare',
  title: 'Build preparation',
  description:
    'Convert individual Typescript files into a single javascript file',
  motivation:
    'Remove internal imports and exclude anything that is not actually used',
  context: 'Before publishing',
  run: 'yarn prepare',
  partOf: tsdxPackage,
  examples: [],
};

const sizeCmd: MdCommand = {
  name: 'size',
  title: 'Performance budget',
  description:
    'Calculates the real cost of the library and throws an error if the cost exceeds the limit',
  motivation: 'Reduces the download time and execution time of the library',
  context: 'Before publishing',
  run: 'yarn size',
  partOf: tsdxPackage,
  examples: [],
};

const analyzeCmd: MdCommand = {
  name: 'analyze',
  title: 'Performance budget',
  description:
    'Describe why the library is of this size and show the real cost of all the internal dependencies',
  motivation: 'Identify dependencies that could be replaced by lighter options',
  context: 'Before publishing',
  run: 'yarn analyze',
  partOf: tsdxPackage,
  examples: [],
};

const readyCmd: MdCommand = {
  name: 'ready',
  title: 'Ready for publishing',
  description:
    'Run a sequence of commands to check that the library is ready to be published',
  motivation: 'Detect quality flaws before pushing the code',
  context: 'Before pushing a branch',
  run: 'yarn ready',
  partOf: yarnPackage,
  examples: [],
};

const versionCmd: MdCommand = {
  name: 'version',
  title: 'Versioning',
  description: 'Checks that the code is ready for versioning and version it',
  motivation: 'Normalize the steps involved in versioning',
  context: 'Before publishing',
  run: 'yarn version',
  partOf: yarnPackage,
  examples: [],
};

const actCmd: MdCommand = {
  name: 'act',
  title: 'Run GitHub Actions locally',
  description: 'Run GitHub Actions inside a docker container',
  motivation: 'Test GitHub Actions locally',
  context: 'When changing github actions',
  run: 'act',
  partOf: actPackage,
  examples: [],
};

const devCommands = [
  lintCmd,
  fixCmd,
  fixOtherCmd,
  testCmd,
  watchCmd,
  testCovCmd,
  prepareCmd,
  sizeCmd,
  analyzeCmd,
  readyCmd,
  versionCmd,
  actCmd,
];

const maintenanceMd = [
  '# Maintenance of the code',
  '## Commands',
  ...devCommands.map(commandToMd),
].join('\n\n');

export { maintenanceMd };
