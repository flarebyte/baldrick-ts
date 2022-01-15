import {
  Badge,
  InstallationType,
  MdCommand,
  MdDocument,
  MdPackage,
  MdSection,
} from './model.js';
import { findHeader, findQuote, stringBetween } from './utils.js';

const ___ = '```';

const getMainSection = (lines: string[]): string[] => {
  const idx = lines.findIndex((line) => line.startsWith('## '));
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
    .filter((index) => index >= 0);
  const indexes = [...foundIndexes, lines.length - 1];
  const idxRange = [...Array.from({ length: foundIndexes.length }).keys()];
  const sections = idxRange.map((idx) =>
    linesToSection(lines.slice(indexes[idx], indexes[idx + 1]))
  );
  return sections;
};

const extractBadge = (line: string): Badge => ({
  text: stringBetween('![', ']')(line),
  imageUrl: stringBetween('(', ')')(line),
  position: 'top',
});

interface BadgeLine {
  line: string;
  starting: number;
  closing: number;
}

interface CumulBadgeLine {
  lines: string[];
  badgeLine: BadgeLine;
}
const countBadgeParts = (line: string): CumulBadgeLine => ({
  badgeLine: {
    line,
    starting: (line.match(/!\[/g) || []).length,
    closing: (line.match(/\)/g) || []).length,
  },
  lines: [],
});

const foldBadgePart = (
  cumul: CumulBadgeLine,
  current: CumulBadgeLine
): CumulBadgeLine => {
  const starting = cumul.badgeLine.starting + current.badgeLine.starting;
  const closing = current.badgeLine.closing;
  const diff = starting >= closing ? starting - closing : 0;
  const addition = starting > 0 ? [current.badgeLine.line] : [];
  const newCumul = {
    badgeLine: {
      line: current.badgeLine.line,
      starting: diff,
      closing: 0,
    },
    lines: [...cumul.lines, ...addition],
  };
  return newCumul;
};

const locateBadgeZone = (lines: string[]): string[] => {
  const badgeLines = lines.map(countBadgeParts);
  const reduced = badgeLines.reduce(foldBadgePart); // eslint-disable-line  unicorn/no-array-reduce
  return reduced.lines;
};
const isWithinBadgeZone =
  (badgeZoneLines: string[]) =>
  (line: string): boolean =>
    badgeZoneLines.includes(line);

const findBadges = (lines: string[]) =>
  lines.join(' ').split(') !').join(')\n!').split('\n').map(extractBadge);

const keepHeaderBody =
  (badgeZoneLines: string[]) =>
  (line: string): boolean =>
    !(
      line.startsWith('# ') ||
      isWithinBadgeZone(badgeZoneLines)(line) ||
      line.startsWith('> ')
    );

export const parseMarkdown = (content: string): MdDocument => {
  const lines = content.split('\n').map((line) => line.trim());
  const mainSect = getMainSection(lines);
  const badgeZone = locateBadgeZone(mainSect);

  const title = findHeader('# ')(mainSect);
  const description = findQuote(mainSect);
  const mainSection = mainSect.filter(keepHeaderBody(badgeZone)).join('\n');
  const badges = findBadges(badgeZone);
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
  `![${badge.text}](${badge.imageUrl})`;

const sectionToString = (section: MdSection): string =>
  [`## ${section.title}`, section.body].join('\n\n');

export const markdownToString = (doc: MdDocument): string => {
  const topBadges = doc.badges
    .filter((b) => b.position === 'top')
    .map(badgeToString)
    .join(' ');
  const bottomBadges = doc.badges
    .filter((b) => b.position === 'bottom')
    .map(badgeToString)
    .join(' ');
  const parts = [
    `# ${doc.title}`,
    topBadges,
    bottomBadges,
    `> ${doc.description}`,
    doc.mainSection,
    ...doc.sections.map(sectionToString),
  ];
  return parts.join('\n\n');
};

const installationTypeToText = (installationType: InstallationType): string => {
  switch (installationType) {
    case 'npm.dev':
      return '[npm](https://www.npmjs.com/)';
    case 'npm.bin':
      return '[npm bin](https://www.npmjs.com/)';
    case 'brew':
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

export const commandToMd = (command: MdCommand): string =>
  [
    `### ${command.title}`,
    `> ${command.description}`,
    `__Motivation:__ ${command.motivation}`,
    `__When to use it:__ ${command.context}`,
    `__Run:__ ${___}${command.run}${___}`,
    ...examplesToMd(command.examples),
    packageCmdToMd(command.partOf),
    '---',
  ].join('\n\n');
