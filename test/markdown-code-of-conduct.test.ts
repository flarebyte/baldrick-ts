import { codeOfConductMd } from '../src/markdown-code-of-conduct.js';

describe('Code of conduct', () => {
  it('normalizes CODE_OF_CONDUCT.md', () => {
    expect(codeOfConductMd).toBeDefined();
  });
});
