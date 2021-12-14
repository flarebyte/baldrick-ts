import { PackageJson } from './model';

const simpleCopyPackageJson = (pj: PackageJson): PackageJson => ({
  name: pj.name,
  description: pj.description,
  keywords: pj.keywords,
  author: pj.author,
  version: pj.version,
  license: pj.license,
  homepage: pj.homepage,
  repository: pj.repository,
  type: pj.type,
  exports: pj.exports,
  main: pj.main,
  bin: pj.bin,
  types: pj.types,
  typings: pj.typings,
  files: pj.files,
  engines: pj.engines,
  scripts: pj.scripts,
  module: pj.module,
  dependencies: pj.dependencies,
  devDependencies: pj.devDependencies,
  peerDependencies: pj.peerDependencies,
});

export const fromString = (content: string): PackageJson => {
  const results: PackageJson = simpleCopyPackageJson(JSON.parse(content));
  return results;
};

export const toString = (packageJson: PackageJson): string => {
  return JSON.stringify(packageJson, null, 2);
};
