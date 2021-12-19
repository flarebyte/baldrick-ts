import { CustomizedPackageJson } from '../src/model';
import { fixAutomatically, suggestTasksToDo } from '../src/package';
import { fromString } from '../src/package-io';
import { libCoreProject } from './fixture-core-project';

describe('Suggestions', () => {
  const customizedPackageJson: CustomizedPackageJson = {
    description: 'some description of the project',
    keywords: ['testing'],
    version: '0.7.0',
    author: {
      name: 'Olivier',
      url: 'http://mywebsite.com',
    },
    scripts: {},
    devDependencies: { typescript: '^4.5.3' },
    dependencies: { commander: '^8.3.0' },
    peerDependencies: {},
  };
  const refPackageJson = fixAutomatically(
    { ...libCoreProject },
    customizedPackageJson
  );
  const ref = fromString(JSON.stringify(refPackageJson));

  it('Fix automatically', () => {
    const actual = fixAutomatically(libCoreProject, ref);
    expect(actual).toMatchSnapshot();
  });

  it('Suggest tasks to do', () => {
    const actual = suggestTasksToDo(libCoreProject, ref);
    expect(actual).toMatchSnapshot();
  });
});
