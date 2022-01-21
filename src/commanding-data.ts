import { CmdOption, CmdOptionsGenerator } from './model.js';

const githubAccount: CmdOption = {
  shortFlag: 'ga',
  longFlag: 'github-account',
  description: 'Github account',
  choices: [],
  mandatory: true,
  variadic: false,
};

const name: CmdOption = {
  shortFlag: 'n',
  longFlag: 'name',
  description: 'Name of the library',
  choices: [],
  mandatory: false,
  variadic: false,
};

const bin: CmdOption = {
  shortFlag: 'b',
  longFlag: 'bin',
  description: 'The binary command used for calling the CLI',
  choices: [],
  mandatory: false,
  variadic: false,
};

const feature: CmdOption = {
  shortFlag: 'f',
  longFlag: 'feature',
  description: 'List of features',
  choices: ['lib', 'cli', 'npx', 'gen', 'no:lint', 'no:test'],
  mandatory: true,
  variadic: true,
};

const license: CmdOption = {
  shortFlag: 'l',
  longFlag: 'license',
  description: 'Open source license if any',
  defaultValue: 'MIT',
  choices: ['MIT', 'UNLICENSED'],
  mandatory: false,
  variadic: false,
};

const copyrightHolder: CmdOption = {
  shortFlag: 'ch',
  longFlag: 'copyright-holder',
  description: 'The owner of the copyright regarding the source code',
  choices: [],
  mandatory: false,
  variadic: false,
};

const copyrightStartYear: CmdOption = {
  shortFlag: 'cy',
  longFlag: 'copyright-start-year',
  description: 'The year the project has been started',
  defaultValue: '2021',
  choices: [],
  mandatory: false,
  variadic: false,
};
const codacyId: CmdOption = {
  shortFlag: 'cod',
  longFlag: 'codacy-id',
  description: 'The codacy id used for the badge',
  choices: [],
  mandatory: false,
  variadic: false,
};

export const cmdOptionsGenerator: CmdOptionsGenerator = {
  feature,
  name,
  githubAccount,
  license,
  copyrightHolder,
  copyrightStartYear,
  bin,
  codacyId,
};
