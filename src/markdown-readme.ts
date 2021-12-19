import { markdownToString, parseMarkdown } from './markdown.js';
import { Badge, CoreProject, MdSection } from './model.js';

const capitalize = (value: string) =>
  (value[0]?.toUpperCase() || '') + value.substring(1);

const libBadges = (core: CoreProject): Badge[] => [
  {
    text: 'npm',
    url: `https://img.shields.io/npm/v/${core.name}`,
  },
  {
    text: 'Build status',
    url: `https://github.com/${core.githubAccount}/${core.name}/actions/workflows/main.yml/badge.svg`,
  },
  {
    text: 'npm bundle size',
    url: `https://img.shields.io/bundlephobia/min/${core.name}`,
  },
  {
    text: 'Dependencies',
    url: `https://status.david-dm.org/gh/${core.githubAccount}/${core.name}.svg`,
  },
  {
    text: 'npm type definitions',
    url: `https://img.shields.io/npm/types/${core.name}`,
  },
  {
    text: 'node-current',
    url: `https://img.shields.io/node/v/${core.name}`,
  },
  {
    text: 'NPM',
    url: `https://img.shields.io/npm/l/${core.name}`,
  },
];

const keepSections = (section: MdSection): boolean =>
  ['Usage'].includes(section.title);

const docAndLinks: MdSection = {
  title: 'Documentation and links',
  body: [
    '* [Code Maintenance](MAINTENANCE.md)',
    '* [Code Of Conduct](CODE_OF_CONDUCT.md)',
    '* [Contributing](CONTRIBUTING.md)',
  ].join('\n'),
};

const installSection = (core: CoreProject): MdSection => {
  const isCli = core.feature.includes('cli');
  const bodyLib = ['```', `yarn add ${core.name}`, '```'];
  const bodyCli = [
    '```',
    `yarn global add ${core.name}`,
    `${core.bin} --help`,
    '```',
    'Or alternatively run it:',
    '```',
    `npx ${core.name} --help`,
    '```',
  ];
  const body = isCli ? bodyCli : bodyLib;

  return {
    title: 'Installation',
    body: body.join('\n'),
  };
};

export const toReadmeMd = (core: CoreProject, existingMd: string): string => {
  const existing = parseMarkdown(existingMd);
  const title = capitalize(core.name);
  const badges = libBadges(core);
  const sections = [
    ...existing.sections.filter(keepSections),
    docAndLinks,
    installSection(core),
  ];
  const updated = {
    ...existing,
    title,
    badges,
    sections,
  };
  const rawReadme = markdownToString(updated);
  return rawReadme.replace(/[\r\n]{3,}/gm, '\n\n');
};
