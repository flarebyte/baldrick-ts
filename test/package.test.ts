import { Todo } from '../src/model';
import {
  defaultPrettier,
  defaultSizeLimit,
  fixAutomatically,
  fromString,
  toString,
  packageToStats,
  suggestTasksToDo,
} from '../src/package';
import { writeFileSync } from '../src/barrel';

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
  it('should convert package.json to a string', () => {
    const parsed = fromString(fixturePackageJsonString);
    const actual = toString(parsed);
    expect(actual.length).toBeGreaterThan(10);
  });
});

const todoToKeys = (todos: Todo[]): string[] =>
  todos.map(v => v.description.replace(' of package.json', '')).sort();
const alwaysMissing = ['Key repository', 'Key scripts'];
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
    expect(todoToKeys(todos)).toEqual(['Key author', ...alwaysMissing].sort());
    expect(todos).toContainEqual({
      description: 'Key author of package.json',
      status: '❌ TODO',
    });
  });
  it('Check the github name is propagated', () => {
    const todos = suggestTasksToDo('byte', ref);
    expect(todoToKeys(todos)).toEqual(
      ['Key homepage', ...alwaysMissing].sort()
    );
  });
  it('Trim spaces for description', () => {
    const actual = {
      ...ref,
      description: 'A description with a trailing space ',
    };
    const todos = suggestTasksToDo('flarebyte', actual);
    expect(todoToKeys(todos)).toEqual(
      ['Key description', ...alwaysMissing].sort()
    );
  });

  it('Trim spaces for keywords', () => {
    const actual = {
      ...ref,
      keywords: ['A keyword with a trailing space '],
    };
    const todos = suggestTasksToDo('flarebyte', actual);
    expect(todoToKeys(todos)).toEqual(
      ['Key keywords', ...alwaysMissing].sort()
    );
  });

  it('Trim spaces for name', () => {
    const actual = {
      ...ref,
      name: `${ref.name} `,
    };
    const todos = suggestTasksToDo('flarebyte', actual);
    // todo check why
    expect(todoToKeys(todos)).toEqual(
      ['Key homepage', 'Key module', ...alwaysMissing].sort()
    );
  });

  it('Check engines field', () => {
    const actual = {
      ...ref,
      engines: {
        node: '12',
      },
    };
    const todos = suggestTasksToDo('flarebyte', actual);
    expect(todoToKeys(todos)).toEqual(['Key engines', ...alwaysMissing].sort());
  });
});

describe('Move specific configuration outside of package.json', () => {
  it('should provide reasonable defaults for prettier', () => {
    expect(defaultPrettier).toBeDefined();
  });

  it('should provide reasonable defaults for size-limit', () => {
    expect(defaultSizeLimit).toBeDefined();
  });
});

const saveNormalizedPackage = () => {
  const actual = fromString(fixturePackageJsonString);
  writeFileSync(
    'test/fixture_fixed_package.json',
    JSON.stringify(fixAutomatically('flarebyte', actual), null, 2),
    'utf8'
  );
};

describe('Normalize package.json', () => {
  const resaveFixture = false;
  if (resaveFixture) {
    saveNormalizedPackage();
  }
  it('Normalize scripts section', () => {
    const expected = require('./fixture_fixed_package.json');
    const ref = fromString(fixturePackageJsonString);
    const actual = fixAutomatically('flarebyte', ref);
    expect(actual).toEqual(expected);
  });
});
