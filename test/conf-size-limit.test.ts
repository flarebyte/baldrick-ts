import { defaultSizeLimit } from '../src/conf-size-limit';
import { libCoreProject } from './fixture-core-project';

describe('configuration for size-limit', () => {
  it('should provide reasonable defaults for size-limit', () => {
    expect(defaultSizeLimit(libCoreProject)).toBeDefined();
  });
});
