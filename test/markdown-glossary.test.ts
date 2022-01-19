import { glossaryMd } from '../src/markdown-glossary';

describe('markdown-glossarys', () => {
  it('should provide a glossary', () => {
    const actual = glossaryMd();
    expect(actual).toMatchSnapshot();
  });
});
