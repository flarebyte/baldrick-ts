import {
  Author,
  FieldStatus,
  PackageJson,
  PackageJsonStatus,
  PackageJsonStatusConverter,
} from './model';
import { autoToStatus, editableArrToStatus, editableToStatus } from './utils';
const fixme = 'fixme';

const packConv: PackageJsonStatusConverter = {
  name: editableToStatus,
  description: editableToStatus,
  keywords: editableArrToStatus,
  author: (value: Author | string) =>
    typeof value === 'string'
      ? FieldStatus.Todo
      : (value as Author).name.includes(fixme) ||
        (value as Author).url.includes(fixme)
      ? FieldStatus.Todo
      : FieldStatus.Ok,
  version: editableToStatus,
  license: editableToStatus,
  homepage: autoToStatus,
  repository: autoToStatus,
  main: autoToStatus,
  typings: autoToStatus,
  files: autoToStatus,
  engines: autoToStatus,
  scripts: autoToStatus,
  module: autoToStatus,
  devDependencies: () => FieldStatus.Ok,
  dependencies: () => FieldStatus.Ok,
  peerDependencies: () => FieldStatus.Ok,
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
  main: packConv.main(packageJson.main, fixedPackageJson.main),
  typings: packConv.typings(packageJson.typings, fixedPackageJson.typings),
  files: packConv.files(packageJson.files, fixedPackageJson.files),
  engines: packConv.engines(packageJson.engines, fixedPackageJson.engines),
  scripts: packConv.scripts(packageJson.scripts, fixedPackageJson.scripts),
  module: packConv.module(packageJson.module, fixedPackageJson.module),
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
