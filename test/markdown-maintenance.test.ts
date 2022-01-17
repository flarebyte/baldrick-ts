import {
  getNpmScripts,
  getZshAliases,
  maintenanceMd,
} from '../src/markdown-maintenance.js';
import { libCoreProject } from './fixture-core-project.js';

describe('Maintenance documentation', () => {
  it('normalizes MAINTENANCE.md', () => {
    expect(maintenanceMd(libCoreProject)).toMatchSnapshot();
  });

  it('produces a list of npm scripts', () => {
    expect(getNpmScripts(libCoreProject)).toMatchSnapshot();
  });

  it('produces a list of zsh aliases', () => {
    expect(getZshAliases(libCoreProject)).toMatchInlineSnapshot(`
      "alias bpub='baldrick release ci'
      alias gcf='git add . && git commit -F .message && rm .message'
      alias yig='yarn global add $PWD'"
    `);
  });
});
