# Baldrick-ts

![npm](https://img.shields.io/npm/v/baldrick-ts)

![Build status](https://github.com/flarebyte/baldrick-ts/actions/workflows/main.yml/badge.svg)

![npm bundle size](https://img.shields.io/bundlephobia/min/baldrick-ts)

![Dependencies](https://status.david-dm.org/gh/flarebyte/baldrick-ts.svg)

![npm type definitions](https://img.shields.io/npm/types/baldrick-ts)

![node-current](https://img.shields.io/node/v/baldrick-ts)

![NPM](https://img.shields.io/npm/l/baldrick-ts)

> Baldrick-ts is a Typescript assistant with a cunning plan that can be used for scaffolding.




























The main motivation is to streamline the development process for node.js libraries and CLI written in Typescript. It supports the following features.

-   **Typescript** the strongly typed alternative to Javascript.
-   **ES2020** or later.
-   [baldrick-dev-ts](https://github.com/flarebyte/baldrick-dev-ts) under the hood linting and testing.
-   **Standardized markdown docs** for maintenance and support.
-   **Github workflow support** for continuous integration.
-   **Visual Studio Code snippets** for common project suggestions.




## Usage




Generate and standardize the source code files

`baldrick-ts generate [options]`

* Options:
* `-f, --feature [feature...]` List of features (choices: "lib", "cli", "gen")
* `-n, --name [name]` Name of the library
* `-ga, --github-account [githubAccount]` Github account
* `-ch, --copyright-holder [copyrightHolder]` The owner of the copyright regarding the source code
* `-cy, --copyright-start-year [copyrightStartYear]` The year the project has been started (default: "2021")
* `-l, --license [license]` Open source license if any (choices: "MIT", "UNLICENSED", default: "MIT")
* `-b, --bin [bin]` The binary command used for calling the CLI
* `-h, --help` display help for command





## Documentation and links

* [Code Maintenance](MAINTENANCE.md)
* [Code Of Conduct](CODE_OF_CONDUCT.md)
* [Contributing](CONTRIBUTING.md)

## Installation

```
yarn global add baldrick-ts
baldrick-ts --help
```
Or alternatively run it:
```
npx baldrick-ts --help
```