import { cmdOptionsGenerator } from './commanding-data.js';
import { commandToMd } from './markdown.js';
import { CoreProject, MdCommand, MdPackage, Scripts } from './model.js';

const baldrickDevPackage: MdPackage = {
  name: 'baldrick',
  installationType: 'npm.dev',
  description: 'Zero-config CLI for TypeScript package development',
  homepage: 'https://github.com/flarebyte/baldrick-dev-ts',
  repository: {
    type: 'git',
    url: 'https://github.com/flarebyte/baldrick-dev-ts',
  },
};

const baldrickScaffoldingPackage: MdPackage = {
  name: 'baldrick-ts',
  installationType: 'npm.dev',
  description: 'Typescript scaffolding assistant',
  homepage: 'https://github.com/flarebyte/baldrick-ts',
  repository: {
    type: 'git',
    url: 'https://github.com/flarebyte/baldrick-ts',
  },
};

const yarnPackage: MdPackage = {
  name: 'yarn',
  installationType: 'npm.dev',
  description: 'Dependency management',
  homepage: 'https://classic.yarnpkg.com/en/',
  repository: {
    type: 'git',
    url: 'https://github.com/yarnpkg',
  },
};

const actPackage: MdPackage = {
  name: 'act',
  installationType: 'brew',
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
  partOf: baldrickDevPackage,
  examples: [],
  npmScript: ['lint', 'baldrick lint check'],
};

const lintFixCmd: MdCommand = {
  name: 'lint:fix',
  title: 'Fix static code analysis',
  description: 'Fix problems in Typescript code',
  motivation: 'Facilitate routine maintenance of code',
  context: 'Before compilation',
  run: 'yarn lint:fix',
  partOf: baldrickDevPackage,
  examples: [],
  npmScript: ['lint:fix', 'baldrick lint fix'],
};

const lintCICmd: MdCommand = {
  name: 'lint:ci',
  title: 'Static code analysis for continuous integration',
  description: 'Find problems in Typescript code',
  motivation: 'Make the code more consistent and avoid bugs',
  context: 'When pushing code to github, before testing',
  run: 'yarn lint:ci',
  partOf: baldrickDevPackage,
  examples: [],
  npmScript: ['lint:ci', 'baldrick lint ci'],
};

const testCmd: MdCommand = {
  name: 'test',
  title: 'Unit testing',
  description: 'Run the unit tests',
  motivation: 'Check that the units of code behave as intended',
  context: 'After compilation, before build',
  run: 'yarn test',
  partOf: baldrickDevPackage,
  examples: [],
  npmScript: ['test', 'baldrick test check'],
};

const testFixCmd: MdCommand = {
  name: 'test:fix',
  title: 'Fix unit testing snapshots',
  description: 'Run the unit tests and update the snapshots',
  motivation: 'Facilitate routine maintenance of unit test snapshots',
  context: 'After compilation, before build',
  run: 'yarn test:fix',
  partOf: baldrickDevPackage,
  examples: [],
  npmScript: ['test:fix', 'baldrick test fix'],
};

const testCovCmd: MdCommand = {
  name: 'test:cov',
  title: 'Unit testing code coverage',
  description:
    'Verify the extent to which the code has been executed. This does not include any threshold, but it is recommended to maximize the coverage',
  motivation: 'Ensure that every code branch and function is executed ',
  context: 'After compilation, before build',
  run: 'yarn test:cov',
  partOf: baldrickDevPackage,
  examples: [],
  npmScript: ['test:cov', 'baldrick test cov'],
};

const testCICmd: MdCommand = {
  name: 'test:ci',
  title: 'Unit testing code and coverage for continuous integration',
  description: 'Test and verify the coverage of the code',
  motivation:
    'Check that the units of code behave as intended and ensure that every code branch and function is executed ',
  context: 'When pushing code to github',
  run: 'yarn test:ci',
  partOf: baldrickDevPackage,
  examples: [],
  npmScript: ['test:ci', 'baldrick test ci'],
};

const resetCmd: MdCommand = {
  name: 'reset',
  title: 'Reset distribution and report folders',
  description: 'Delete the dist and report folder',
  motivation: 'Start from a clean slate',
  context: 'Before building',
  run: 'yarn reset',
  partOf: yarnPackage,
  examples: [],
  npmScript: ['reset', 'rm -rf dist; rm -rf report'],
};

const buildCmd: MdCommand = {
  name: 'build',
  title: 'Build the library',
  description: 'Transpile all the typescript source code to javascript',
  motivation: 'ESM library should be written in javascript',
  context: 'Before building',
  run: 'yarn build',
  partOf: yarnPackage,
  examples: [],
  npmScript: ['build', 'yarn reset;tsc --outDir dist'],
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
const og = cmdOptionsGenerator;
const normCmd = (project: CoreProject, global: boolean): MdCommand => {
  return {
    name: global ? 'norm:global' : 'norm',
    title: global
      ? 'Normalize the code structure'
      : 'Normalize the code structure using latest',
    description: global
      ? 'Normalize the code structure using baldrick (global version)'
      : 'Normalize the code structure using baldrick (npx version)',
    motivation: 'Create a consistent developer experience',
    context: 'When changing github actions',
    run: global ? 'yarn norm:g' : 'yarn norm',
    partOf: baldrickScaffoldingPackage,
    examples: [],
    npmScript: [
      global ? 'norm:g' : 'norm',
      [
        global ? 'baldrick-ts' : 'npx baldrick-ts',
        `-${og.feature.shortFlag}`,
        project.feature.join(' '),
        `-${og.githubAccount.shortFlag}`,
        `'${project.githubAccount}'`,
        `-${og.copyrightHolder.shortFlag}`,
        `'${project.copyrightHolder}'`,
        `-${og.copyrightStartYear.shortFlag}`,
        project.copyrightStartYear,
        `-${og.license.shortFlag}`,
        project.license,
        `-${og.bin.shortFlag}`,
        project.bin,
      ].join(' '),
    ],
  };
};

const devCommands = [
  lintCmd,
  lintFixCmd,
  lintCICmd,
  testCmd,
  testFixCmd,
  testCovCmd,
  testCICmd,
  resetCmd,
  buildCmd,
  readyCmd,
  versionCmd,
  actCmd,
];

export const maintenanceMd = (project: CoreProject) =>
  [
    '# Maintenance of the code',
    '## Commands',
    [...devCommands, normCmd(project, false), normCmd(project, true)].map(
      commandToMd
    ),
  ].join('\n\n');

const removeNulls = <S>(value: S | undefined): value is S => value != null;

export const getNpmScripts = (project: CoreProject): Scripts => {
  const isCliOrLib =
    project.feature.includes('lib') || project.feature.includes('cli');
  if (isCliOrLib) {
    const commands = [
      ...devCommands,
      normCmd(project, false),
      normCmd(project, true),
    ]
      .map((cmd) => cmd.npmScript)
      .filter(removeNulls);
    return Object.fromEntries(commands);
  }
  return {};
};
