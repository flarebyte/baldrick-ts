import { vsCodeSnippets } from '../src/conf-vscode-snippet';

describe('conf-vscode-snippet.test', () => {
  it('should provide visual code snippets', () => {
    const actual = vsCodeSnippets;
    expect(Object.keys(actual)).toMatchInlineSnapshot(`
      Array [
        "b-rm-nulls",
        "eslint-disable-line",
        "eslint-disable-next-line",
        "jest-regression-inline",
        "mock-console",
      ]
    `);
  });
});
