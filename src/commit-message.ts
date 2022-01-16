import { version } from './version.js';

export const commitMessage = (): string =>
  [
    `Normalize the code structure with baldrick-ts version ${version}`,
    'See https://github.com/flarebyte/baldrick-ts/releases',
  ].join('\n');
