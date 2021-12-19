import { VsCodeSnippet, VsCodeSnippetObj } from './model';

const scope = 'javascript,typescript';

const snippets: VsCodeSnippet[] = [
  {
    scope,
    prefix: 'b-rm-nulls',
    body: 'const removeNulls = <S>(value: S | undefined): value is S => value != null;',
    description: 'Filter out undefined values',
  },
];

export const vsCodeSnippets: VsCodeSnippetObj = Object.fromEntries(
  snippets.map((snippet) => [snippet.prefix, snippet])
);
