import { PackageJson, PackageKeyStats } from './model';
import { toCountItems, toStringLength } from './utils';

export const packageToStats = (packageJson: PackageJson): PackageKeyStats[] =>
  Object.entries(packageJson).map((keyValue) => ({
    key: keyValue[0],
    countItems: toCountItems(keyValue[1]),
    stringLength: toStringLength(keyValue[1]),
  }));
