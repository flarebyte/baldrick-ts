import { Todo } from '../src/model';
import { fixAutomatically, suggestTasksToDo } from '../src/package';
import { fromString } from '../src/package-io';
import { libCoreProject } from './fixture-core-project';
const fixturePackageJsonString: string = JSON.stringify(
  require('./fixture_package.json'),
  null,
  2
);

const todoToKeys = (todos: Todo[]): string[] =>
  todos.map(v => v.description.replace(' of package.json', '')).sort();

describe('Suggestions', () => {
  const ref = fromString(fixturePackageJsonString);
  const alwaysMissing = ['Key scripts'];
  it('Summarize what to be fixed and done', () => {
    const todos = suggestTasksToDo(libCoreProject, ref);
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
    const todos = suggestTasksToDo(libCoreProject, actual);
    expect(todoToKeys(todos)).toEqual(['Key author', ...alwaysMissing].sort());
    expect(todos).toContainEqual({
      description: 'Key author of package.json',
      status: '❌ TODO',
    });
  });

  it('Check that the author does not contain fixme', () => {
    const actual = {
      ...ref,
      author: {
        name: 'fixme',
        url: 'https://github.com/fixme',
      },
    };
    const todos = suggestTasksToDo(libCoreProject, actual);
    expect(todoToKeys(todos)).toEqual(['Key author', ...alwaysMissing].sort());
    expect(todos).toContainEqual({
      description: 'Key author of package.json',
      status: '❌ TODO',
    });
  });

  it('Check the github name is propagated', () => {
    const byteConfig = {
      ...libCoreProject,
      githubAccount: 'byte',
    };
    const todos = suggestTasksToDo(byteConfig, ref);
    expect(todoToKeys(todos)).toEqual(
      ['Key homepage', 'Key repository', ...alwaysMissing].sort()
    );
  });
  it('Trim spaces for description', () => {
    const actual = {
      ...ref,
      description: 'A description with a trailing space ',
    };
    const todos = suggestTasksToDo(libCoreProject, actual);
    expect(todoToKeys(todos)).toEqual(
      ['Key description', ...alwaysMissing].sort()
    );
  });

  it('Trim spaces for keywords', () => {
    const actual = {
      ...ref,
      keywords: ['A keyword with a trailing space '],
    };
    const todos = suggestTasksToDo(libCoreProject, actual);
    expect(todoToKeys(todos)).toEqual(
      ['Key keywords', ...alwaysMissing].sort()
    );
  });

  it('Trim spaces for name', () => {
    const actual = {
      ...ref,
      name: `${ref.name} `,
    };
    const todos = suggestTasksToDo(libCoreProject, actual);
    // todo check why
    expect(todoToKeys(todos)).toEqual(
      ['Key name', ...alwaysMissing].sort()
    );
  });

  it('Check engines field', () => {
    const actual = {
      ...ref,
      engines: {
        node: '12',
      },
    };
    const todos = suggestTasksToDo(libCoreProject, actual);
    expect(todoToKeys(todos)).toEqual(['Key engines', ...alwaysMissing].sort());
  });

  it('should detect empty string', () => {
    const actual = {
      ...ref,
      description: '',
    };
    const todos = suggestTasksToDo(libCoreProject, actual);
    expect(todoToKeys(todos)).toEqual(
      ['Key description', ...alwaysMissing].sort()
    );
  });
});


describe('Normalize package.json', () => {
  it('Normalize scripts section', () => {
    const ref = fromString(fixturePackageJsonString);
    const actual = fixAutomatically(libCoreProject, ref);
    expect(actual).toMatchSnapshot()
  });

  it('Normalize for other cases', () => {
    const ref = fromString(fixturePackageJsonString);
    const given = {
      ...ref,
      license: 'GPL',
    };
    const actual = fixAutomatically(libCoreProject, given);
    expect(actual).toBeDefined();
  });
});
