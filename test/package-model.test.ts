import { fromString } from '../src/package-model';

const fixturePackageJsonString: string = JSON.stringify(require('./fixture_package.json'), null, 2);

describe('Package.json analyzer', () => {
    it('should convert package.json from a string', () => {
        const actual = fromString(fixturePackageJsonString)
        expect(typeof actual).not.toBe('string');
      });
})