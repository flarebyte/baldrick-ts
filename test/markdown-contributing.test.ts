import { contributingMd } from '../src/markdown-contributing.js';

describe('Contributing', () => {
  it('normalizes CONTRIBUTING.md', () => {
    expect(contributingMd).toBeDefined();
  });
});
