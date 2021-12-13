import { libCoreProject } from './fixture-core-project';
import { toReadmeMd } from '../src/markdown-readme';
import { CoreProject } from '../src/model';
const ___ = '```';

const exampleReadme = `
# Scratch Book

![npm](https://img.shields.io/npm/v/scratchbook)
![Build status](https://github.com/flarebyte/scratchbook/actions/workflows/main.yml/badge.svg)

![npm bundle size](https://img.shields.io/bundlephobia/min/scratchbook)
![Dependencies](https://status.david-dm.org/gh/flarebyte/scratchbook.svg)

![npm type definitions](https://img.shields.io/npm/types/scratchbook)
![node-current](https://img.shields.io/node/v/scratchbook)
![NPM](https://img.shields.io/npm/l/scratchbook)

> Scratch Book is an annotation library written in Typescript that makes it easy to write documentation in a decentralized fashion.

- **Typescript** can be used to write the documentation. Integrates perfectly with [ts-node](https://typestrong.org/ts-node/).
- **No dependency** and lightweight.
- **Advanced matchers** to query the notes.
- **Simple model** for the notes that requires very little learning curve while still offering a lot of flexibility.
- **extensive tests coverage**.

## Usage

${___}
const myScratchBook: ScratchBook = {
    notes: [
        createScratchNote('about/scratchbook/description', 'Annotation library'),
        createScratchNote('about/scratchbook/github', 'scratchbook on github', 'https://github.com/flarebyte/scratchbook'),
        createScratchNote('about/other/...', 'Some other projects')
    ]
}
filterScratchBook(withPrefix('about/scratchbook/'))(myScratchBook)
// will return the description and the github link

${___}

### Documentation

A detailed documentation for each functions is [available](https://flarebyte.github.io/scratchbook/)

### Installation

${___}
yarn add scratchbook
${___}

## License

MIT © [2021 Flarebyte - Olivier Huin]()
`;

describe('Readme documentation', () => {
  it('Updates README.md with standardized chapters', () => {
    const project: CoreProject = {
      ...libCoreProject
    };
    const actual = toReadmeMd(project, exampleReadme);
    expect(actual).toContain('# Project123');
    expect(actual).toContain('(https://img.shields.io/npm/v/scratchbook)');
    expect(actual).toContain(
      '(https://github.com/mycompany/scratchbook/actions/workflows/main.yml/badge.svg)'
    );
    expect(actual).toContain(
      '(https://img.shields.io/bundlephobia/min/scratchbook)'
    );
    expect(actual).toContain('## Usage');
    expect(actual).toContain('## Documentation and links');
    expect(actual).toContain('## Installation');
    expect(actual).toContain('yarn add scratchbook');
    expect(actual).not.toContain('## License');
  });
});
