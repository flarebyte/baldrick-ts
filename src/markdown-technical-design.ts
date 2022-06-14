import { markdownToString, parseMarkdown } from './markdown.js';
import { CoreProject, MdSection } from './model.js';

const keepSections = (section: MdSection): boolean =>
  ['Overview', 'Purpose'].includes(section.title);

const codeStructure: MdSection = {
  title: 'Code structure',
  body: [
    ' - __src__: Typescript source code',
    ' - __test__: Jest unit tests',
    ' - __script__: Folder for bash, python or ts-node scripts',
    ' - __dist__: Temporary folder for building distribution code',
    ' - __report__: Temporary folder for reporting; usually for continuous integration',
    ' - __.github__: Folder for github pipeline',
    ' - __.vscode__: Folder for visual code snippets',
  ].join('\n\n'),
};

const docAndLinks: MdSection = {
  title: 'Useful links',
  body: [
    ' - Guideline for [Clean Code in Typescript](https://labs42io.github.io/clean-code-typescript/)',
    ' - [Supporting node.js ESM](https://the-guild.dev/blog/support-nodejs-esm)',
  ].join('\n\n'),
};

export const toTechnicalDesignMd = (
  _core: CoreProject,
  existingMd: string
): string => {
  const existing = parseMarkdown(existingMd);

  const sections = [
    ...existing.sections.filter(keepSections),
    codeStructure,
    docAndLinks,
  ];
  const updated = {
    ...existing,
    title: 'Technical Design',
    badges: [],
    description:
      'Guide for the implementation, including detailed design, priorities, coding conventions, and testing',
    sections,
  };
  const rawReadme = markdownToString(updated);
  return rawReadme.replace(/[\n\r]{3,}/gm, '\n\n');
};
