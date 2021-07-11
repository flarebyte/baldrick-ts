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

  it.todo('Convert author to obj format');
  it.todo('Move prettier outside package');
  it.todo('Move size-limit outside package');
  it.todo('Delete husky');
  it.todo('Automatically create mandatory fields');

  it.todo('Display a todo list');

  it.todo('Display fixme in the todo list');

  it.todo('Check name consistency in different fields');

  it.todo('Check source code structure is normalized');

  it.todo('Normalize scripts section');
});
