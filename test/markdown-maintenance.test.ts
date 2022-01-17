import {
  getCommandHelp,
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

  it('produces an help for the commands', () => {
    expect(getCommandHelp(libCoreProject)).toMatchInlineSnapshot(`
      "Commands:
      act                 Run GitHub Actions inside a docker container
      bpub                Creates a github release
      yarn build          Transpile all the typescript source code to javascript
      yarn doc            Generate the markdown documentation for the typescript project
      yarn github         Enable useful features for the github project repository
      yarn lint           Find problems in Typescript code
      yarn lint:ci        Find problems in Typescript code
      yarn lint:fix       Fix problems in Typescript code
      yarn md             Checks that the markdown documents follows some consistent guidelines
      yarn md:fix         Modify the markdown documents to ensure they follow some consistent guidelines
      yarn norm           Normalize the code structure using baldrick (npx version)
      yarn norm:g         Normalize the code structure using baldrick (global version)
      yarn prebuild       Delete the dist and report folder
      yarn ready          Run a sequence of commands to check that the library is ready to be published
      yarn release:check  Checks if a release could be created
      yarn reset          Delete the dist and report folder
      yarn test           Run the unit tests
      yarn test:ci        Test and verify the coverage of the code
      yarn test:cov       Verify the extent to which the code has been executed. This does not include any threshold, but it is recommended to maximize the coverage
      yarn test:fix       Run the unit tests and update the snapshots
      yig                 Git commit a message that has been saved in the .message file
      yig                 Install this local project/script globally on the dev machine for development or testing purpose"
    `);
  });
});
