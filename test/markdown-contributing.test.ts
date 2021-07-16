import { contributingMd } from '../src/markdown-contributing';

describe('Contributing', () => {
  it('normalizes CONTRIBUTING.md', () => {
    expect(contributingMd).toBeDefined();
  });
});
