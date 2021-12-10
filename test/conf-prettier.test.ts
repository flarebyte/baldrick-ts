import { defaultPrettier } from '../src/conf-prettier';

describe('configuration for prettier', () => {
  it('should provide reasonable defaults for prettier', () => {
    expect(defaultPrettier).toBeDefined();
  });
});
