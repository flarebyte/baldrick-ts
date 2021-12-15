import { GenerateActionOpts, RunnerContext } from '../src/model';
import { computeCoreProject } from '../src/package-copy';

describe('Copy elements from package.json to core project', () => {
  
  it('it should compute the core project', () => {
    const ctx: RunnerContext = {
      currentPath: 'path/to/here/scratchbook',
      termFormatter: jest.fn(),
      errTermFormatter: jest.fn(),
    }
    const opts: GenerateActionOpts = {
      feature: ['lib'],
      githubAccount: 'myaccount'
    }
    const actual = computeCoreProject(ctx, opts);
    expect(actual.githubAccount).toBe(opts.githubAccount);
    expect(actual.licenseType).toBe('MIT');
    expect(actual.name).toEqual('scratchbook');
    expect(actual.feature).toContain('lib');
  });
  
});
