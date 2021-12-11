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
  [key: string]: string;
}

type LicenseType = "MIT" | "UNLICENSED"
 
type ProjectType = "lib" | "cli"
  
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

 interface GenericPackageJson<T> {
  name: T;
  description: T;
  keywords: T;
  author: T;
  version: T;
  license: T;
  homepage: T;
  repository: T;
  main: T;
  typings: T;
  files: T;
  engines: T;
  scripts: T;
  module: T;
  devDependencies: T;
  dependencies: T;
  peerDependencies: T;
}

export type PackageJsonStatusConverter = GenericPackageJson<toFieldStatus>
  
export type PackageJsonStatus = GenericPackageJson<FieldStatus>

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

type InstallationType = "npm.dev" | "brew"

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
