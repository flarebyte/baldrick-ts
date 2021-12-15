import { PackageJson, PackageKeyStats } from './model.js';
import { toCountItems, toStringLength } from './utils.js';

export const packageToStats = (packageJson: PackageJson): PackageKeyStats[] =>
  Object.entries(packageJson).map((keyValue) => ({
    key: keyValue[0],
    countItems: toCountItems(keyValue[1]),
    stringLength: toStringLength(keyValue[1]),
  }));
