import { defaultPrettier } from '../src/conf-prettier.js';

describe('configuration for prettier', () => {
  it('should provide reasonable defaults for prettier', () => {
    expect(defaultPrettier).toBeDefined();
  });
});
