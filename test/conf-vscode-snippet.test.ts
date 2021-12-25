import { vsCodeSnippets } from '../src/conf-vscode-snippet.js';

describe('conf-vscode-snippet.test', () => {
  it('should provide visual code snippets', () => {
    const actual = vsCodeSnippets;
    expect(Object.keys(actual)).toMatchInlineSnapshot(`
      Array [
        "filter-no-null",
        "eslint-disable-line",
        "eslint-disable-next-line",
        "jest-regression-inline",
        "mock-console",
        "stringify",
      ]
    `);
  });
});
