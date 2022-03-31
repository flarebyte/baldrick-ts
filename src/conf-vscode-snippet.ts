import { VsCodeSnippet, VsCodeSnippetObj } from './model';

const scope = 'javascript,typescript';

const snippets: VsCodeSnippet[] = [
  {
    scope,
    prefix: 'filter-no-null',
    body: 'const removeNulls = <S>(value: S | undefined): value is S => value != null;',
    description: 'Filter out undefined values',
  },
  {
    scope,
    prefix: 'eslint-disable-line',
    body: '// eslint-disable-line $0',
    description: 'Disable linting a specific Line',
  },
  {
    scope,
    prefix: 'eslint-disable-next-line',
    body: '// eslint-disable-next-line $0',
    description: 'Disable linting for next line',
  },
  {
    scope,
    prefix: 'jest-regression-inline',
    body: [
      "import { $1 } from '../src/${TM_FILENAME_BASE/.test//}';",
      '',
      "describe('${TM_FILENAME_BASE/.test//}', () => {",
      "  it('should provide', () => {",
      '    const opts = {};',
      '    const actual = $1(opts);',
      '    expect(actual).toMatchInlineSnapshot();',
      '  });',
      '});',
      '',
    ],
    description: 'Unit test to provide regression with a snapshot',
  },
  {
    scope,
    prefix: 'mock-console',
    body: 'jest.spyOn(global.console, "${1|log,info,warn,error|}").mockImplementation(() => {});',
    description: 'Mock console in unit tests',
  },
  {
    scope,
    prefix: 'stringify',
    body: [
      'const toJsonString = (value: object): string =>',
      '  JSON.stringify(value, null, 2);',
    ],
    description: 'stringify an object',
  },
];

export const vsCodeSnippets: VsCodeSnippetObj = Object.fromEntries(
  snippets.map((snippet) => [snippet.prefix, snippet])
);
