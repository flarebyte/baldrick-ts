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

export enum LicenseType {
  MIT,
  Other,
}

export enum ScaffoldingType {
  TsDx,
  Other,
}

export enum PipelineType {
  Github,
  Other,
}

export enum ProjectType {
  TsLib,
  TsCli,
  Other,
}

export interface CoreProject {
  name: string;
  githubAccount: string;
  licenseType: LicenseType;
  scaffoldingType: ScaffoldingType;
  pipelineType: PipelineType;
  projectType: ProjectType;
}

export interface TodoPriority {
  name: string;
  specialChar: string;
}
export interface Todo {
  name: string;
  description: string;
  priority: TodoPriority;
}

export enum FieldStatus {
  Ok,
  Todo,
  Fixable,
}
export type toFieldStatus = (value: any) => FieldStatus;

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
