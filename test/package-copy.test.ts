import { GenerateActionOpts, RunnerContext } from '../src/model.js';
import { computeCoreProject } from '../src/package-copy.js';
import { jest } from '@jest/globals';

describe('Copy elements from package.json to core project', () => {
  it('it should compute the core project', () => {
    const ctx: RunnerContext = {
      currentPath: 'path/to/here/scratchbook',
      termFormatter: jest.fn(),
      errTermFormatter: jest.fn(),
      currentYear: 2021,
    };
    const opts: GenerateActionOpts = {
      feature: ['lib'],
      githubAccount: 'myaccount',
      license: 'MIT',
      copyrightHolder: 'My Company',
      copyrightStartYear: 2020,
      name: '',
    };
    const actual = computeCoreProject(ctx, opts);
    expect(actual.githubAccount).toBe(opts.githubAccount);
    expect(actual.license).toBe('MIT');
    expect(actual.name).toEqual('scratchbook');
    expect(actual.feature).toContain('lib');
  });
});
