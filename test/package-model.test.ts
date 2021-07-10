import { fromString, packageToStats } from '../src/package-model';

const fixturePackageJsonString: string = JSON.stringify(
  require('./fixture_package.json'),
  null,
  2
);

describe('Package.json analyzer', () => {
  it('should convert package.json from a string', () => {
    const actual = fromString(fixturePackageJsonString);
    const stats = packageToStats(actual);
    expect(actual.name.length).toBeGreaterThan(1);
    expect(stats.filter( s => s.countItems === 0 && s.stringLength === 0 ).map( s => s.key)).toStrictEqual(['dependencies', 'peerDependencies']);
  });
});
