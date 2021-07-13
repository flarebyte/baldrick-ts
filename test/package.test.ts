import { Todo } from '../src/model';
import { fromString, packageToStats, suggestTasksToDo } from '../src/package';

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

  it.todo('Move prettier outside package');
  it.todo('Move size-limit outside package');

  it.todo('Check name consistency in different fields');

  it.todo('Check source code structure is normalized');

  it.todo('Normalize scripts section');
});

const todoToKeys = (todos: Todo[]): string[] =>
  todos.map(v => v.description.replace(' of package.json', '')).sort();

describe('Suggestions', () => {
  const ref = fromString(fixturePackageJsonString);
  it('Summarize what to be fixed and done', () => {
    const todos = suggestTasksToDo('flarebyte', ref);
    expect(todos).toContainEqual({
      description: 'Key repository of package.json',
      status: '🤖 FIX',
    });
    expect(todos).toContainEqual({
      description: 'Key scripts of package.json',
      status: '🤖 FIX',
    });
  });
  it('Check that the author is in obj format', () => {
    const actual = {
      ...ref,
      author: 'Mathilde',
    };
    const todos = suggestTasksToDo('flarebyte', actual);
    const todoKeys = todoToKeys(todos);
    expect(todoKeys).toEqual(['Key author', 'Key repository', 'Key scripts']);
    expect(todos).toContainEqual({
      description: 'Key author of package.json',
      status: '❌ TODO',
    });
  });
  it('Check the github name is propagated', () => {
    const todos = suggestTasksToDo('byte', ref);
    const todoKeys = todoToKeys(todos);
    expect(todoKeys).toEqual(['Key homepage', 'Key repository', 'Key scripts']);
  });
});
