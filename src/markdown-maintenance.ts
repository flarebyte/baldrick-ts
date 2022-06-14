import { markdownTable } from 'markdown-table';
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

const githubPackage: MdPackage = {
  name: 'gh',
  installationType: 'brew',
  description: 'GitHub CLI brings GitHub to your terminal',
  homepage: 'https://cli.github.com/',
  repository: {
    type: 'git',
    url: 'https://github.com/cli/cli',
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

const zshPackage: MdPackage = {
  name: 'zsh',
  installationType: 'brew',
  description: 'Shell designed for interactive use',
  homepage: 'https://www.zsh.org/',
  repository: {
    type: 'git',
    url: 'https://github.com/ohmyzsh',
  },
};

const runBaldrick = (project: CoreProject): string =>
  project.feature.includes('npx') ? 'npx baldrick-dev-ts' : 'baldrick';

const lintCmd = (project: CoreProject): MdCommand => ({
  name: 'lint',
  title: 'Static code analysis',
  description: 'Find problems in Typescript code',
  motivation: 'Make the code more consistent and avoid bugs',
  context: 'Before compilation',
  run: 'yarn lint',
  partOf: baldrickDevPackage,
  examples: [],
  npmScript: ['lint', `${runBaldrick(project)} lint check -s src test`],
});

const lintFixCmd = (project: CoreProject): MdCommand => ({
  name: 'lint:fix',
  title: 'Fix static code analysis',
  description: 'Fix problems in Typescript code',
  motivation: 'Facilitate routine maintenance of code',
  context: 'Before compilation',
  run: 'yarn lint:fix',
  partOf: baldrickDevPackage,
  examples: [],
  npmScript: ['lint:fix', `${runBaldrick(project)} lint fix -s src test`],
});

const lintCICmd = (project: CoreProject): MdCommand => ({
  name: 'lint:ci',
  title: 'Static code analysis for continuous integration',
  description: 'Find problems in Typescript code',
  motivation: 'Make the code more consistent and avoid bugs',
  context: 'When pushing code to github, before testing',
  run: 'yarn lint:ci',
  partOf: baldrickDevPackage,
  examples: [],
  npmScript: ['lint:ci', `${runBaldrick(project)} lint ci`],
});

const testCmd = (project: CoreProject): MdCommand => ({
  name: 'test',
  title: 'Unit testing',
  description: 'Run the unit tests',
  motivation: 'Check that the units of code behave as intended',
  context: 'After compilation, before build',
  run: 'yarn test',
  partOf: baldrickDevPackage,
  examples: [],
  npmScript: ['test', `${runBaldrick(project)} test check`],
});

const testFixCmd = (project: CoreProject): MdCommand => ({
  name: 'test:fix',
  title: 'Fix unit testing snapshots',
  description: 'Run the unit tests and update the snapshots',
  motivation: 'Facilitate routine maintenance of unit test snapshots',
  context: 'After compilation, before build',
  run: 'yarn test:fix',
  partOf: baldrickDevPackage,
  examples: [],
  npmScript: ['test:fix', `${runBaldrick(project)} test fix`],
});

const testCovCmd = (project: CoreProject): MdCommand => ({
  name: 'test:cov',
  title: 'Unit testing code coverage',
  description:
    'Verify the extent to which the code has been executed. This does not include any threshold, but it is recommended to maximize the coverage',
  motivation: 'Ensure that every code branch and function is executed ',
  context: 'After compilation, before build',
  run: 'yarn test:cov',
  partOf: baldrickDevPackage,
  examples: [],
  npmScript: ['test:cov', `${runBaldrick(project)} test cov`],
});

const testCICmd = (project: CoreProject): MdCommand => ({
  name: 'test:ci',
  title: 'Unit testing code and coverage for continuous integration',
  description: 'Test and verify the coverage of the code',
  motivation:
    'Check that the units of code behave as intended and ensure that every code branch and function is executed ',
  context: 'When pushing code to github',
  run: 'yarn test:ci',
  partOf: baldrickDevPackage,
  examples: [],
  npmScript: ['test:ci', `${runBaldrick(project)} test ci`],
});

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

const prebuildCmd: MdCommand = {
  name: 'prebuild',
  title: 'Clear previous build',
  description: 'Delete the dist and report folder',
  motivation: 'Start from a clean slate',
  context: 'Before building',
  run: 'yarn prebuild',
  partOf: yarnPackage,
  examples: [],
  npmScript: ['prebuild', 'yarn reset'],
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
  npmScript: ['build', 'tsc --outDir dist'],
};

const docCmd: MdCommand = {
  name: 'doc',
  title: 'Generate the documentation',
  description: 'Generate the markdown documentation for the typescript project',
  motivation: 'Good documentation is essential for developer experience',
  context: 'Before publishing',
  run: 'yarn doc',
  partOf: yarnPackage,
  examples: [],
  npmScript: [
    'doc',
    [
      'npx typedoc --json report/doc.json --pretty src/index.ts',
      'npx baldrick-doc-ts typedoc --json-source report/doc.json',
      'baldrick-doc-ts parse -f internal ngram',
      'yarn md:fix',
    ].join(' && '),
  ],
};

const githubCmd: MdCommand = {
  name: 'github',
  title: 'Update github repository',
  description: 'Enable useful features for the github project repository',
  motivation: 'Create consistent settings',
  context: 'After creating',
  run: 'yarn github',
  partOf: githubPackage,
  examples: [],
  npmScript: [
    'github',
    'gh repo edit --delete-branch-on-merge --enable-squash-merge',
  ],
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
  npmScript: [
    'ready',
    'yarn lint && yarn test:cov && yarn md && yarn outdated && yarn audit && yarn release:check',
  ],
};

const mdCmd = (project: CoreProject): MdCommand => ({
  name: 'md',
  title: 'Markdown check',
  description:
    'Checks that the markdown documents follows some consistent guidelines',
  motivation: 'Make the markdown documents consistent in style',
  context: 'Before publishing',
  run: 'yarn md',
  partOf: yarnPackage,
  examples: [],
  npmScript: [
    'md',
    `${runBaldrick(project)} markdown check && ${runBaldrick(
      project
    )} markdown check -s .github/`,
  ],
});

const mdFixCmd = (project: CoreProject): MdCommand => ({
  name: 'md:fix',
  title: 'Markdown fix',
  description:
    'Modify the markdown documents to ensure they follow some consistent guidelines',
  motivation: 'Make the markdown documents consistent in style',
  context: 'Before publishing',
  run: 'yarn md:fix',
  partOf: yarnPackage,
  examples: [],
  npmScript: [
    'md:fix',
    `${runBaldrick(project)} markdown fix && ${runBaldrick(
      project
    )} markdown fix -s .github/`,
  ],
});

const cliCmd = (): MdCommand => ({
  name: 'cli',
  title: 'Run client directly',
  description: 'Run the client with ts-node during development',
  motivation:
    'Simulate a CLI app in development without the need to install it globally',
  context: 'After compilation',
  run: 'yarn cli',
  partOf: yarnPackage,
  examples: [],
  npmScript: ['cli', 'node --loader ts-node/esm src/cli.mts'],
});

const releaseCheckCmd = (project: CoreProject): MdCommand => ({
  name: 'release:check',
  title: 'Release check',
  description: 'Checks if a release could be created',
  motivation: 'Avoid failing the release',
  context: 'After publishing',
  run: 'yarn release:check',
  partOf: baldrickDevPackage,
  examples: [],
  npmScript: ['release:check', `${runBaldrick(project)} release check`],
});

const helpCmd: MdCommand = {
  name: 'help',
  title: 'Help for commands',
  description: 'Summarize all the yarn and shell commands',
  motivation: 'Assist the developer in quickly finding commands',
  context: 'Before running a command',
  run: 'yarn h',
  partOf: baldrickDevPackage,
  examples: [],
  npmScript: ['h', 'cat commands.txt'],
};

const releaseCiCmd = (project: CoreProject): MdCommand => ({
  name: 'release:ci',
  title: 'Release',
  description: 'Creates a github release',
  motivation: 'Save releases in github',
  context: 'After publishing',
  run: 'bpub',
  partOf: baldrickDevPackage,
  examples: [],
  npmScript: ['release:ci', `${runBaldrick(project)} release ci`],
  zshAlias: ['bpub', `yarn build && npx baldrick-dev-ts release ci`],
});

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
  const npmMandatoryScript = [
    global ? 'baldrick-ts generate' : 'npx baldrick-ts generate',
    `-${og.feature.shortFlag}`,
    project.feature.join(' '),
    `-${og.githubAccount.shortFlag}`,
    `'${project.githubAccount}'`,
    `-${og.copyrightHolder.shortFlag}`,
    `'${project.copyrightHolder}'`,
    `-${og.copyrightStartYear.shortFlag}`,
    `${project.copyrightStartYear}`,
    `-${og.license.shortFlag}`,
    project.license,
  ];

  const codacyScript = project.codacyId
    ? [`-${og.codacyId.shortFlag}`, project.codacyId]
    : [];

  const binParam =
    project.feature.includes('cli') && project.bin !== project.name
      ? [`-${og.bin.shortFlag}`, project.bin]
      : [];

  const npmScript = [
    ...npmMandatoryScript,
    ...binParam,
    ...codacyScript,
    '&& yarn md:fix',
  ];

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
    npmScript: [global ? 'norm:g' : 'norm', npmScript.join(' ')],
  };
};

const yarnAddGlobalCmd: MdCommand = {
  name: 'yarn-add-global',
  title: 'Install the local project globally',
  description:
    'Install this local project/script globally on the dev machine for development or testing purpose',
  motivation: 'Test global project locally before publishing',
  context: 'When testing locally',
  run: 'yig',
  partOf: yarnPackage,
  examples: [],
  zshAlias: ['yig', 'yarn global add $PWD'],
};

const gitCommitFileCmd: MdCommand = {
  name: 'gc-file',
  title: 'Git commit from file',
  description: 'Git commit a message that has been saved in the .message file',
  motivation: 'Quicker commit for pre-defined use cases',
  context: 'When commit to github',
  run: 'gcf',
  partOf: zshPackage,
  examples: [],
  zshAlias: ['gcf', 'git add . && git commit -F .message && rm .message'],
};

const devCommands = (project: CoreProject): MdCommand[] => [
  actCmd,
  buildCmd,
  docCmd,
  githubCmd,
  lintCICmd(project),
  lintCmd(project),
  lintFixCmd(project),
  mdCmd(project),
  mdFixCmd(project),
  prebuildCmd,
  readyCmd,
  resetCmd,
  testCICmd(project),
  testCmd(project),
  testCovCmd(project),
  testFixCmd(project),
  releaseCheckCmd(project),
  releaseCiCmd(project),
  helpCmd,
  gitCommitFileCmd,
  yarnAddGlobalCmd,
];

const maintenanceOverview = (project: CoreProject) =>
  markdownTable([
    ['Mode', 'Code analysis', 'Testing', 'Building', 'Publishing'],
    [
      'Checking',
      lintCmd(project).run,
      `${testCmd(project).run} or ${testCovCmd(project).run}`,
      buildCmd.run,
      `${readyCmd.run} and ${releaseCheckCmd(project).run}`,
    ],
    [
      'Fixing',
      lintFixCmd(project).run,
      testFixCmd(project).run,
      'Fix the code',
      `Update dependencies and ${docCmd.run}`,
    ],
    [
      'Continuous integration',
      lintCICmd(project).run,
      testCICmd(project).run,
      buildCmd.run,
      releaseCiCmd(project).run,
    ],
  ]);

export const maintenanceMd = (project: CoreProject): string => {
  const cmds = [
    ...devCommands(project),
    normCmd(project, false),
    normCmd(project, true),
    cliCmd(),
  ];
  const cmdSections: string[] = cmds.map(commandToMd);
  return [
    '# Maintenance of the code',
    '## Overall workflow',
    'The typical developer workflow goes as follow:',
    maintenanceOverview(project),
    '## Commands',
    ...cmdSections,
  ].join('\n\n');
};

const removeNulls = <S>(value: S | undefined): value is S => value != undefined;

export const getNpmScripts = (project: CoreProject): Scripts => {
  const isCli = project.feature.includes('cli');
  const isCliOrLib = project.feature.includes('lib') || isCli;
  const cliOnlyCommands = isCli ? [cliCmd()] : [];
  if (isCliOrLib) {
    const commands = [
      ...devCommands(project),
      normCmd(project, false),
      normCmd(project, true),
      ...cliOnlyCommands,
    ]
      .map((cmd) => cmd.npmScript)
      .filter(removeNulls);
    return Object.fromEntries(commands);
  }
  return {};
};

export const getZshAliases = (project: CoreProject): string => {
  const isCliOrLib =
    project.feature.includes('lib') || project.feature.includes('cli');
  if (!isCliOrLib) {
    return '# no alias available';
  }
  const commands = devCommands(project)
    .map((cmd) => cmd.zshAlias)
    .filter(removeNulls)
    .map(([name, command]) => `alias ${name}='${command}'`);

  return commands.join('\n');
};

export const getCommandHelp = (project: CoreProject): string => {
  const commands = [
    ...devCommands(project),
    normCmd(project, false),
    normCmd(project, true),
    cliCmd(),
  ];

  const runMaxLength = Math.max(...commands.map((cmd) => cmd.run.length));

  const helps = commands
    .map((cmd) => cmd.run.padEnd(runMaxLength + 2, ' ') + cmd.description)
    .sort();
  return ['Commands:', ...helps].join('\n');
};
