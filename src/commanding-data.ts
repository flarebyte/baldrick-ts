import { CmdOption, CmdOptionsGenerator } from './model.js';

const githubAccount: CmdOption = {
  shortFlag: 'gh',
  longFlag: 'github-account',
  description: 'Github account',
  defaultValue: '',
  choices: [],
};

const feature: CmdOption = {
  shortFlag: 'f',
  longFlag: 'feature',
  description: 'List of features',
  defaultValue: '',
  choices: ['lib', 'cli'],
};

export const cmdOptionsGenerator: CmdOptionsGenerator = {
  feature,
  githubAccount,
};
