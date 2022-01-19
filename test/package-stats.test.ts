import { CustomizedPackageJson } from '../src/model.js';
import { fixAutomatically } from '../src/package.js';
import { fromString, toString } from '../src/package-io.js';
import { packageToStats } from '../src/package-stats.js';
import { libCoreProject } from './fixture-core-project.js';

describe('IO and package stats', () => {
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
  it('should convert package.json from a string', () => {
    const stats = packageToStats(ref);
    expect(stats).toMatchInlineSnapshot(`
      Array [
        Object {
          "countItems": 1,
          "key": "name",
          "stringLength": 11,
        },
        Object {
          "countItems": 1,
          "key": "description",
          "stringLength": 31,
        },
        Object {
          "countItems": 1,
          "key": "keywords",
          "stringLength": 0,
        },
        Object {
          "countItems": 2,
          "key": "author",
          "stringLength": 0,
        },
        Object {
          "countItems": 1,
          "key": "version",
          "stringLength": 5,
        },
        Object {
          "countItems": 1,
          "key": "license",
          "stringLength": 3,
        },
        Object {
          "countItems": 1,
          "key": "homepage",
          "stringLength": 40,
        },
        Object {
          "countItems": 1,
          "key": "bugs",
          "stringLength": 47,
        },
        Object {
          "countItems": 2,
          "key": "repository",
          "stringLength": 0,
        },
        Object {
          "countItems": 1,
          "key": "type",
          "stringLength": 6,
        },
        Object {
          "countItems": 2,
          "key": "exports",
          "stringLength": 0,
        },
        Object {
          "countItems": 0,
          "key": "bin",
          "stringLength": 0,
        },
        Object {
          "countItems": 2,
          "key": "files",
          "stringLength": 0,
        },
        Object {
          "countItems": 1,
          "key": "engines",
          "stringLength": 0,
        },
        Object {
          "countItems": 20,
          "key": "scripts",
          "stringLength": 0,
        },
        Object {
          "countItems": 1,
          "key": "dependencies",
          "stringLength": 0,
        },
        Object {
          "countItems": 1,
          "key": "devDependencies",
          "stringLength": 0,
        },
        Object {
          "countItems": 0,
          "key": "peerDependencies",
          "stringLength": 0,
        },
      ]
    `);
  });
  it('should convert package.json to a string', () => {
    const parsed = fromString(JSON.stringify(refPackageJson));
    const actual = toString(parsed);
    expect(actual.length).toBeGreaterThan(10);
  });
});
