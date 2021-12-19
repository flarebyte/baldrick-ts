import { PackageJson, PackageKeyStats } from './model.js';
import { toCountItems, toStringLength } from './utils.js';
/**
 * Not sure why we have this now ?
 */
export const packageToStats = (packageJson: PackageJson): PackageKeyStats[] =>
  Object.entries(packageJson).map((keyValue) => ({
    key: keyValue[0],
    countItems: toCountItems(keyValue[1]),
    stringLength: toStringLength(keyValue[1]),
  }));
