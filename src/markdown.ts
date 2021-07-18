import {
  Badge,
  InstallationType,
  MdCommand,
  MdDocument,
  MdPackage,
  MdSection,
} from './model';
import { findHeader, stringBetween } from './utils';

const ___ = '```';

const getMainSection = (lines: string[]): string[] => {
  const idx = lines.findIndex(line => line.startsWith('## '));
  return idx === -1 ? lines : lines.slice(0, idx);
};

const discardHeader2 = (line: string): boolean => !line.startsWith('## ');

const linesToSection = (lines: string[]): MdSection => {
  const title = findHeader('## ')(lines);
  const body = lines.filter(discardHeader2).join('\n');
  return {
    title,
    body,
  };
};

const detectSecondaryHeader = (line: string, index: number): number =>
  line.startsWith('## ') ? index : -1;

const getSecondarySections = (lines: string[]): MdSection[] => {
  const foundIndexes = lines
    .map(detectSecondaryHeader)
    .filter(index => index >= 0);
  const indexes = [...foundIndexes, lines.length - 1];
  const idxRange = Array.from(Array(foundIndexes.length).keys());
  const sections = idxRange.map(idx =>
    linesToSection(lines.slice(indexes[idx], indexes[idx + 1]))
  );
  return sections;
};

const extractBadge = (line: string): Badge => ({
  text: stringBetween('![', ']')(line),
  url: stringBetween('(', ')')(line),
});
const findBadges = (lines: string[]) =>
  lines.filter(line => line.startsWith('![')).map(extractBadge);

const keepHeaderBody = (line: string): boolean =>
  !(line.startsWith('# ') || line.startsWith('![') || line.startsWith('> '));

const parseMarkdown = (content: string): MdDocument => {
  const lines = content.split('\n').map(line => line.trim());
  const mainSect = getMainSection(lines);

  const title = findHeader('# ')(mainSect);
  const description = findHeader('> ')(mainSect);
  const mainSection = mainSect.filter(keepHeaderBody).join('\n');
  const badges = findBadges(mainSect);
  const sections = getSecondarySections(lines);
  return {
    title,
    description,
    badges,
    mainSection,
    sections,
  };
};

const badgeToString = (badge: Badge): string =>
  `![${badge.text}](${badge.url})`;

const sectionToString = (section: MdSection): string =>
  [`## ${section.title}`, section.body].join('\n\n');

const markdownToString = (doc: MdDocument): string => {
  const parts = [
    `# ${doc.title}`,
    ...doc.badges.map(badgeToString),
    `> ${doc.description}`,
    doc.mainSection,
    ...doc.sections.map(sectionToString),
  ];
  return parts.join('\n\n');
};

const installationTypeToText = (installationType: InstallationType): string => {
  switch (installationType) {
    case InstallationType.NpmDev:
      return '[npm](https://www.npmjs.com/)';
    case InstallationType.NpmStandalone:
      return '[npm bin](https://www.npmjs.com/)';
    case InstallationType.Brew:
      return '[brew](https://docs.brew.sh/)';
  }
};

const packageCmdToMd = (pkg: MdPackage): string =>
  [
    `__From package:__ [${pkg.name}](${
      pkg.homepage
    }) of ${installationTypeToText(pkg.installationType)} :  ${
      pkg.description
    }`,
  ].join('\n');

const exampleToMd = (example: string) => `${___}${example}${___}`;
const examplesToMd = (examples: string[]): string[] =>
  examples.length === 0 ? [] : ['__Examples:__', ...examples.map(exampleToMd)];

const commandToMd = (command: MdCommand): string =>
  [
    `### ${command.title}`,
    `> ${command.description}`,
    `__Motivation:__ ${command.motivation}`,
    `__When to use it:__ ${command.context}`,
    `__Run:__ ${___}${command.run}${___}`,
    ...examplesToMd(command.examples),
    packageCmdToMd(command.partOf),
  ].join('\n\n');

export { parseMarkdown, markdownToString, commandToMd };
