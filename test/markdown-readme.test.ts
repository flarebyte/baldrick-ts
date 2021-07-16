import { libCoreProject } from './fixture-core-project';
import { toReadmeMd } from '../src/markdown-readme';
describe('Readme documentation', () => {
  it('Updates README.md with standardized chapters', () => {
    const existingReadme = `
        # About this doc
        `;
    const actual = toReadmeMd(libCoreProject, existingReadme);
    expect(actual).toBeDefined();
  });
});
