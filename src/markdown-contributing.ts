import { minimumNodeVersion } from './model.js';

const _ = '`';
const ___ = '```';

const contributingMd = `
# Contributing

Welcome ! and many thanks for taking the time to contribute !

First, you should have a look at the [Technical design documentation](TECHNICAL_DESIGN.md) to get an understanding of the design behind this project.

From there, there are a few options depending of which kind of contributions you have in mind: bug fix, documentation improvement, translation, testing, ...

Please note we have a [code of conduct](CODE_OF_CONDUCT.md), please follow it in all your interactions with the project.

## Build the project locally

The following commands should get you started:

${___}bash
yarn install
yarn test
${___}

A list of [most used commands](MAINTENANCE.md) is available:

${___}bash
yarn h
${___}

Please keep an eye on test coverage, bundle size and documentation.
When you are ready for a pull request:

${___}bash
yarn ready
${___}

And please check that building is still working:
${___}bash
yarn build
${___}

You can also simulate [Github actions](https://docs.github.com/en/actions) locally with [act](https://github.com/nektos/act). 
You will need to setup ${_}.actrc${_} with the node.js docker image ${_}-P ubuntu-latest=node:${minimumNodeVersion}-buster${_}

To run the pipeline:

${___}bash
act
${___}

## Pull Request Process

1. Make sure that an issue describing the intended code change exists and that this issue has been accepted.


## Publishing the library

This would be done by the main maintainers of the project. Locally for now as updates are pretty infrequent, and some of tests have to be done manually.

Assuming you have zsh installed, you can just do:

${___}bash
source .aliases.zsh
bpub
${___}
`;

export { contributingMd };
