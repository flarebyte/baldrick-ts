import { Badge, CoreProject, MdDocument, MdSection } from './model';
import { findHeader, stringBetween } from './utils';
const _ = '`';
const ___ = '```';

const codeOfConductMd = `
# Contributor Covenant Code of Conduct

## Our Pledge

In the interest of fostering an open and welcoming environment, we as contributors and maintainers pledge to making participation in our project and our community a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

## Our Standards

Examples of behavior that contributes to creating a positive environment include:

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

Examples of unacceptable behavior by participants include:

- The use of sexualized language or imagery and unwelcome sexual attention or advances
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information, such as a physical or electronic address, without explicit permission
- Other conduct which could reasonably be considered inappropriate in a professional setting

## Our Responsibilities

Project maintainers are responsible for clarifying the standards of acceptable behavior and are expected to take appropriate and fair corrective action in response to any instances of unacceptable behavior.

Project maintainers have the right and responsibility to remove, edit, or reject comments, commits, code, wiki edits, issues, and other contributions that are not aligned to this Code of Conduct, or to ban temporarily or permanently any contributor for other behaviors that they deem inappropriate, threatening, offensive, or harmful.

## Scope

This Code of Conduct applies both within project spaces and in public spaces when an individual is representing the project or its community. Examples of representing a project or community include using an official project e-mail address, posting via an official social media account, or acting as an appointed representative at an online or offline event. Representation of a project may be further defined and clarified by project maintainers.

## Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the project team. The project team will review and investigate all complaints, and will respond in a way that it deems appropriate to the circumstances. The project team is obligated to maintain confidentiality with regard to the reporter of an incident. Further details of specific enforcement policies may be posted separately.

Project maintainers who do not follow or enforce the Code of Conduct in good faith may face temporary or permanent repercussions as determined by other members of the project's leadership.

## Attribution

This Code of Conduct is adapted from the [Contributor Covenant][homepage], version 1.4, available at [http://contributor-covenant.org/version/1/4][version]

[homepage]: http://contributor-covenant.org
[version]: http://contributor-covenant.org/version/1/4/
`;
const contributingMd = `
# Contributing

Welcome ! and many thanks for taking the time to contribute !

First, you should have a look at the [Technical design documentation](TECHNICAL_DESIGN.md) to get an understanding of the design behind this project.

From there, there are a few options dependending of which kind of contributions you have in mind: bug fix, documentation improvement, translation, testing, ...

Please note we have a [code of conduct](CODE_OF_CONDUCT.md), please follow it in all your interactions with the project.

## Build the project locally

The project mostly relies on the approach suggested by [ts-dx](TSDX.md).

The following commands should get you started

${___}
yarn install
yarn test

${___}

Please keep an eye on test coverage, bundle size and documentation.

${___}
yarn ready
${___}

You can also simulate [Github actions](https://docs.github.com/en/actions) locally with [act](https://github.com/nektos/act). 
You will need to setup ${_}.actrc${_} with the node.js docker image ${_}-P ubuntu-latest=node:12-buster${_}

To run the pipeline:

${___}
act
${___}

## Pull Request Process

1. Make sure that an issue describing the intended code change exists and that this issue has been accepted.


## Publishing the library

This would be done by the main maintainers of the project. Locally for now as updates are pretty infrequent.

${___}
yarn version
${___}
`;
const maintenanceMd = `
# Developer maintenance
`;

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
  [`## ${section.title}`, section.body].join('\n');

const markdownToString = (doc: MdDocument): string => {
  const parts = [
    `# ${doc.title}`,
    ...doc.badges.map(badgeToString),
    `> ${doc.description}`,
    doc.mainSection,
    ...doc.sections.map(sectionToString),
  ];
  return parts.join('\n');
};

const toReadmeMd = (_a: CoreProject, _b: string): string => '';

export {
  codeOfConductMd,
  contributingMd,
  maintenanceMd,
  toReadmeMd,
  parseMarkdown,
  markdownToString,
};
