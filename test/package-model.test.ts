import { fromString, packageToStats } from '../src/package-model';

const fixturePackageJsonString: string = JSON.stringify(
  require('./fixture_package.json'),
  null,
  2
);

const notIncluded = (a: string[], b: string[]): string[] =>
  a.filter(v => !b.includes(v));

describe('Package.json analyzer', () => {
  it('should convert package.json from a string', () => {
    const initJson = JSON.parse(fixturePackageJsonString);
    const actual = fromString(fixturePackageJsonString);
    const stats = packageToStats(actual);
    expect(actual.name.length).toBeGreaterThan(1);
    expect(
      stats
        .filter(s => s.countItems === 0 && s.stringLength === 0)
        .map(s => s.key)
    ).toStrictEqual(['dependencies', 'peerDependencies']);
    expect(
      notIncluded(Object.keys(initJson), Object.keys(actual)).sort()
    ).toStrictEqual(['husky', 'prettier', 'size-limit']);
    expect(
      notIncluded(Object.keys(actual), Object.keys(initJson)).sort()
    ).toStrictEqual(['dependencies']);
  });
});
