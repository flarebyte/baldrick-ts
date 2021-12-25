describe('Check imports', () => {
  it('lodash.isequal', async () => {
    const actual = await import('lodash.isequal');
    expect(actual).toBeDefined();
  });
  it('markdown-table', async () => {
    const actual = await import('markdown-table');
    expect(actual.markdownTable).toBeDefined();
  });

  it('commander', async () => {
    const actual = await import('commander');
    expect(actual.Command).toBeDefined();
    expect(actual.Option).toBeDefined();
  });
});
