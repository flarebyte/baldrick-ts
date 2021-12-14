import { fromString, toString } from '../src/package-io';
import { packageToStats } from '../src/package-stats';

const fixturePackageJsonString: string = JSON.stringify(
  require('./fixture_package.json'),
  null,
  2
);

describe('IO and package stats', () => {
  it('should convert package.json from a string', () => {
    const actual = fromString(fixturePackageJsonString);
    const stats = packageToStats(actual);
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
          "stringLength": 127,
        },
        Object {
          "countItems": 3,
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
          "countItems": 1,
          "key": "exports",
          "stringLength": 18,
        },
        Object {
          "countItems": 1,
          "key": "main",
          "stringLength": 13,
        },
        Object {
          "countItems": 0,
          "key": "bin",
          "stringLength": 0,
        },
        Object {
          "countItems": 1,
          "key": "types",
          "stringLength": 8,
        },
        Object {
          "countItems": 1,
          "key": "typings",
          "stringLength": 15,
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
          "countItems": 15,
          "key": "scripts",
          "stringLength": 0,
        },
        Object {
          "countItems": 1,
          "key": "module",
          "stringLength": 23,
        },
        Object {
          "countItems": 0,
          "key": "dependencies",
          "stringLength": 0,
        },
        Object {
          "countItems": 7,
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
    const parsed = fromString(fixturePackageJsonString);
    const actual = toString(parsed);
    expect(actual.length).toBeGreaterThan(10);
  });
});
