import { Commanding } from '../src/commanding.js';
import { jest } from '@jest/globals';
import { GenerateAction } from '../src/model.js';

const actAndGetSecondParam = async (given: string[]) => {
  const commanding = new Commanding();
  const mockedAction = jest.fn();
  commanding.declareGenerateAction(mockedAction as GenerateAction);
  await commanding.parseAsync(['node', 'baldrick-ts', 'generate', ...given]);
  const secondParam = mockedAction.mock.calls[0] && mockedAction.mock.calls[0][1];
  return secondParam;
};

describe('Command Generate', () => {
  it('check each json with schemas', async () => {
    const secondParam = await actAndGetSecondParam([
      '--feature',
      'cli',
      '--github-account',
      'flarebyte',
    ]);
    expect(secondParam).toMatchInlineSnapshot(`
      Object {
        "bin": undefined,
        "copyrightHolder": undefined,
        "copyrightStartYear": 2021,
        "feature": Array [
          "cli",
        ],
        "githubAccount": "flarebyte",
        "license": "MIT",
        "name": undefined,
      }
    `);
  });
});
