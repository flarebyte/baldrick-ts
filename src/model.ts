export interface PackageJson {
  name: string;
  description: string;
  keywords: string[];
  author: Author | string;
  version: string;
  license: string;
  homepage: string;
  repository: Repository;
  main: string;
  typings: string;
  files: string[];
  engines: Engines;
  scripts: Scripts;
  module: string;
  devDependencies: Dependencies;
  dependencies: Dependencies;
  peerDependencies: Dependencies;
}

export interface PackageKeyStats {
  key: string;
  countItems: number;
  stringLength: number;
}

export interface Author {
  name: string;
  url: string;
}

export interface Dependencies {
  [key: string]: string;
}

export interface Engines {
  node: string;
}

export interface Repository {
  type: string;
  url: string;
}

export interface Scripts {
  build: string;
  lint: string;
  'lint:fix': string;
  test: string;
  'test:fix': string;
  'test:cov': string;
  [key: string]: string;
}

export type LicenseType = "MIT" | "UNLICENSED"
 
export type ProjectType = "lib" | "cli"
  
export interface CoreProject {
  name: string;
  githubAccount: string;
  licenseType: LicenseType;
  projectType: ProjectType;
}

export type FieldStatus = "ok" | "todo" | "fixable"
 
export interface Todo {
  description: string;
  status: string;
}

export type toFieldStatus = (value: any, fixed: any) => FieldStatus;

export interface PackageJsonStatusConverter {
  name: toFieldStatus;
  description: toFieldStatus;
  keywords: toFieldStatus;
  author: toFieldStatus;
  version: toFieldStatus;
  license: toFieldStatus;
  homepage: toFieldStatus;
  repository: toFieldStatus;
  main: toFieldStatus;
  typings: toFieldStatus;
  files: toFieldStatus;
  engines: toFieldStatus;
  scripts: toFieldStatus;
  module: toFieldStatus;
  devDependencies: toFieldStatus;
  dependencies: toFieldStatus;
  peerDependencies: toFieldStatus;
}

export interface PackageJsonStatus {
  name: FieldStatus;
  description: FieldStatus;
  keywords: FieldStatus;
  author: FieldStatus;
  version: FieldStatus;
  license: FieldStatus;
  homepage: FieldStatus;
  repository: FieldStatus;
  main: FieldStatus;
  typings: FieldStatus;
  files: FieldStatus;
  engines: FieldStatus;
  scripts: FieldStatus;
  module: FieldStatus;
  devDependencies: FieldStatus;
  dependencies: FieldStatus;
  peerDependencies: FieldStatus;
}

export interface Badge {
  text: string;
  url: string;
}

export interface MdSection {
  title: string;
  body: string;
}

export interface MdDocument {
  title: string;
  description: string;
  badges: Badge[];
  mainSection: string;
  sections: MdSection[];
}

export type InstallationType = "npm.dev" | "brew"

export interface MdPackage {
  name: string;
  description: string;
  homepage: string;
  repository: Repository;
  installationType: InstallationType;
}

export interface MdCommand {
  name: string;
  title: string;
  /**
   * What this tool is providing
   */
  description: string;
  /**
   * Why we should use this tool
   */
  motivation: string;
  /**
   * When we should use this tool
   */
  context: string;
  partOf: MdPackage;
  /**
   * Main command to run this tool
   */
  run: string;
  /**
   * Ways to run this tools with additional parameters
   */
  examples: string[];
}
