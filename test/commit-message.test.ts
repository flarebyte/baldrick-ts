import { commitMessage } from '../src/commit-message';

describe('commit-message', () => {
  it('should provide a commit message', () => {
    const actual = commitMessage();
    expect(actual).toMatchInlineSnapshot(`
      "Normalize the code structure with baldrick-ts version 0.16.0
      See https://github.com/flarebyte/baldrick-ts/releases"
    `);
  });
});
