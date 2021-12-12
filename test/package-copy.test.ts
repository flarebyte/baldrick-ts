import {
} from '../src/model';
import { packageToCoreProject } from '../src/package-copy';
import { fromString } from '../src/package-io';
import { libCoreProject } from './fixture-core-project';
const fixturePackageJsonString: string = JSON.stringify(
  require('./fixture_package.json'),
  null,
  2
);

describe('Copy elements from package.json to core project', () => {
  const ref = fromString(fixturePackageJsonString);
  it('it should understand MIT', () => {
    const actual = packageToCoreProject(libCoreProject, ref);
    expect(actual.githubAccount).toBe(libCoreProject.githubAccount);
    expect(actual.licenseType).toBe('MIT');
    expect(actual.name).toEqual('scratchbook');
    expect(actual.projectType).toEqual('tslib');
  });
  
});
