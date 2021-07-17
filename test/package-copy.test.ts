import {
  LicenseType,
  PipelineType,
  ProjectType,
  ScaffoldingType,
} from '../src/model';
import { packageToCoreProject } from '../src/package-copy';
import { fromString } from '../src/package-io';
const fixturePackageJsonString: string = JSON.stringify(
  require('./fixture_package.json'),
  null,
  2
);

describe('Copy elements from package.json to core project', () => {
  const ref = fromString(fixturePackageJsonString);
  it('it should understand MIT', () => {
    const actual = packageToCoreProject('flarebyte', ref);
    expect(actual.githubAccount).toBe('flarebyte');
    expect(actual.licenseType).toBe(LicenseType.MIT);
    expect(actual.name).toEqual('scratchbook');
    expect(actual.pipelineType).toEqual(PipelineType.Github);
    expect(actual.projectType).toEqual(ProjectType.TsLib);
    expect(actual.scaffoldingType).toEqual(ScaffoldingType.TsDx);
  });

  it('it should understand other license', () => {
    const modified = {
      ...ref,
      license: 'GPL',
    };
    const actual = packageToCoreProject('flarebyte', modified);
    expect(actual.licenseType).toEqual(LicenseType.Other);
  });

  it('it should understand other scaffolding', () => {
    const modified = {
      ...ref,
      devDependencies: {
        typescript: '^4.3.5',
      },
    };
    const actual = packageToCoreProject('flarebyte', modified);
    expect(actual.scaffoldingType).toEqual(ScaffoldingType.Other);
  });
});