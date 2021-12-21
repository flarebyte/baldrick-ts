import { getNpmScripts, maintenanceMd } from '../src/markdown-maintenance';
import { libCoreProject } from './fixture-core-project';

describe('Maintenance documentation', () => {
  it('normalizes MAINTENANCE.md', () => {
    expect(maintenanceMd(libCoreProject)).toMatchSnapshot()
  });

  it('produces a list of npm scripts', () => {
    expect(getNpmScripts(libCoreProject)).toMatchSnapshot()
  });
});
