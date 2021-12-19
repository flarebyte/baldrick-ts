import { PackageJson } from './model.js';

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
  bin: pj.bin,
  files: pj.files,
  engines: pj.engines,
  scripts: pj.scripts,
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
