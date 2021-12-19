import {
  PackageJson,
  PackageJsonStatus,
  PackageJsonStatusConverter,
} from './model.js';
import {
  authorToStatus,
  autoToStatus,
  editableArrToStatus,
  editableToStatus,
} from './utils.js';

const packConv: PackageJsonStatusConverter = {
  name: editableToStatus,
  description: editableToStatus,
  keywords: editableArrToStatus,
  author: authorToStatus,
  version: editableToStatus,
  license: editableToStatus,
  homepage: autoToStatus,
  repository: autoToStatus,
  type: autoToStatus,
  files: autoToStatus,
  engines: autoToStatus,
  scripts: autoToStatus,
  devDependencies: () => 'ok',
  dependencies: () => 'ok',
  peerDependencies: () => 'ok',
  exports: autoToStatus,
  bin: autoToStatus,
};

export const convertPackageToStatus = (
  packageJson: PackageJson,
  fixedPackageJson: PackageJson
): PackageJsonStatus => ({
  name: packConv.name(packageJson.name, fixedPackageJson.name),
  description: packConv.description(
    packageJson.description,
    fixedPackageJson.description
  ),
  keywords: packConv.keywords(packageJson.keywords, fixedPackageJson.keywords),
  author: packConv.author(packageJson.author, fixedPackageJson.author),
  version: packConv.version(packageJson.version, fixedPackageJson.version),
  license: packConv.license(packageJson.license, fixedPackageJson.license),
  homepage: packConv.homepage(packageJson.homepage, fixedPackageJson.homepage),
  repository: packConv.repository(
    packageJson.repository,
    fixedPackageJson.repository
  ),
  type: packConv.type(packageJson.type, fixedPackageJson.type),
  exports: packConv.exports(packageJson.exports, fixedPackageJson.exports),
  files: packConv.files(packageJson.files, fixedPackageJson.files),
  bin: packConv.bin(packageJson.bin, fixedPackageJson.bin),
  engines: packConv.engines(packageJson.engines, fixedPackageJson.engines),
  scripts: packConv.scripts(packageJson.scripts, fixedPackageJson.scripts),
  devDependencies: packConv.devDependencies(
    packageJson.devDependencies,
    fixedPackageJson.devDependencies
  ),
  dependencies: packConv.dependencies(
    packageJson.dependencies,
    fixedPackageJson.dependencies
  ),
  peerDependencies: packConv.peerDependencies(
    packageJson.peerDependencies,
    fixedPackageJson.peerDependencies
  ),
});
