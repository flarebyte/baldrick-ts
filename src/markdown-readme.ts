import { markdownToString, parseMarkdown } from './markdown.js';
import { Badge, CoreProject, MdSection } from './model.js';

const capitalize = (value: string) =>
  (value[0]?.toUpperCase() || '') + value.slice(1);

const libBadges = (core: CoreProject): Badge[] => {
  const always: Badge[] = [
    {
      text: 'npm',
      imageUrl: `https://img.shields.io/npm/v/${core.name}`,
      position: 'top',
    },
    {
      text: 'Build status',
      imageUrl: `https://github.com/${core.githubAccount}/${core.name}/actions/workflows/main.yml/badge.svg`,
      position: 'top',
    },
    {
      text: 'npm bundle size',
      imageUrl: `https://img.shields.io/bundlephobia/min/${core.name}`,
      position: 'top',
    },
    {
      text: 'npm type definitions',
      imageUrl: `https://img.shields.io/npm/types/${core.name}`,
      position: 'bottom',
    },
    {
      text: 'node-current',
      imageUrl: `https://img.shields.io/node/v/${core.name}`,
      position: 'bottom',
    },
    {
      text: 'NPM',
      imageUrl: `https://img.shields.io/npm/l/${core.name}`,
      position: 'bottom',
    },
  ];
  const codacy: Badge[] = core.codacyId
    ? [
        {
          text: 'Codacy Badge',
          imageUrl: `https://app.codacy.com/project/badge/Grade/${core.codacyId}`,
          position: 'top',
          refUrl: `https://www.codacy.com/gh/${core.githubAccount}/${core.name}/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=${core.githubAccount}/${core.name}&amp;utm_campaign=Badge_Grade`,
        },
      ]
    : [];
  return [...always, ...codacy];
};

const keepSections = (section: MdSection): boolean =>
  ['Usage', 'Advanced use', 'Acknowledgements'].includes(section.title);

const docAndLinks = (core: CoreProject): MdSection => ({
  title: 'Documentation and links',
  body: [
    '* [Code Maintenance](MAINTENANCE.md)',
    '* [Code Of Conduct](CODE_OF_CONDUCT.md)',
    `* [Api for ${core.name}](API.md)`,
    '* [Contributing](CONTRIBUTING.md)',
    '* [Glossary](GLOSSARY.md)',
    '* [Diagram for the code base](INTERNAL.md)',
    '* [Vocabulary used in the code base](CODE_VOCABULARY.md)',
    '* [Architectural Decision Records](DECISIONS.md)',
    `* [Contributors](https://github.com/${core.githubAccount}/${core.name}/graphs/contributors)`,
    `* [Dependencies](https://github.com/${core.githubAccount}/${core.name}/network/dependencies)`,
  ].join('\n'),
});

const installSection = (core: CoreProject): MdSection => {
  const isCli = core.feature.includes('cli');
  const bodyLib = ['```bash', `yarn add ${core.name}`, '```'];
  const bodyCli = [
    '```bash',
    `yarn global add ${core.name}`,
    `${core.bin} --help`,
    '```',
    'Or alternatively run it:',
    '```bash',
    `npx ${core.name} --help`,
    '```',
    'If you want to tun the latest version from github. Mostly useful for dev:',
    '```bash',
    `git clone git@github.com:${core.githubAccount}/${core.name}.git`,
    'yarn global add `pwd`',
    '```',
  ];
  const body = isCli ? bodyCli : bodyLib;

  return {
    title: 'Installation',
    body: [
      'This package is [ESM only](https://blog.sindresorhus.com/get-ready-for-esm-aa53530b3f77).',
      ...body,
    ].join('\n'),
  };
};

export const toReadmeMd = (core: CoreProject, existingMd: string): string => {
  const existing = parseMarkdown(existingMd);
  const title = capitalize(core.name);
  const badges = libBadges(core);
  const sections = [
    ...existing.sections.filter(keepSections),
    docAndLinks(core),
    installSection(core),
  ];
  const updated = {
    ...existing,
    title,
    badges,
    sections,
  };
  const rawReadme = markdownToString(updated);
  return rawReadme.replace(/[\n\r]{3,}/gm, '\n\n');
};
