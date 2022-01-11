import { libCoreProject } from './fixture-core-project.js';
import { toReadmeMd } from '../src/markdown-readme.js';
import { CoreProject } from '../src/model.js';
const ___ = '```';

const exampleReadme = `
# Scratch Book

![npm](https://img.shields.io/npm/v/baldrick-ts) ![Build
status](https://github.com/flarebyte/baldrick-ts/actions/workflows/main.yml/badge.svg)
![npm bundle size](https://img.shields.io/bundlephobia/min/baldrick-ts)

![npm type definitions](https://img.shields.io/npm/types/baldrick-ts)
![node-current](https://img.shields.io/node/v/baldrick-ts)
![NPM](https://img.shields.io/npm/l/baldrick-ts)

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
      ...libCoreProject,
      name: 'project123',
    };
    const actual = toReadmeMd(project, exampleReadme);
    expect(actual).toMatchSnapshot();
  });
});
