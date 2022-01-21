export const minimumNodeVersion = 14;

interface PackageJsonCondExports {
  import?: string;
  require?: string;
  default: string;
  types?: string;
}
interface PackageJsonExports {
  [key: string]: PackageJsonCondExports;
}

export type PackageJson = {
  name: string;
  description: string;
  keywords: string[];
  author: Author | string;
  version: string;
  license: string;
  homepage: string;
  repository: Repository;
  bugs: string;
  /** should be module or commonjs */
  type: string;
  /** Modern public exports for CommonJS and ES modules*/
  exports: PackageJsonExports;
  main: string;
  /** Array of file patterns that describes the entries to be included when your package is installed as a dependency*/
  files: string[];
  bin: { [key: string]: string };
  engines: Engines;
  scripts: Scripts;
  devDependencies: Dependencies;
  dependencies: Dependencies;
  peerDependencies: Dependencies;
};

export type CustomizedPackageJson = Pick<
  PackageJson,
  | 'description'
  | 'keywords'
  | 'version'
  | 'author'
  | 'scripts'
  | 'devDependencies'
  | 'dependencies'
  | 'peerDependencies'
>;

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

type ProjectType = 'lib' | 'cli';

export type SupportedFeature = ProjectType | 'npx' | 'no:lint' | 'no:test';

export interface GenerateActionOpts {
  feature: SupportedFeature[];
  name?: string;
  bin?: string;
  license: string;
  githubAccount: string;
  copyrightHolder?: string;
  copyrightStartYear: number;
  codacyId?: string;
}

export interface GenerateRawOpts {
  feature: string[];
  name?: string;
  bin?: string;
  license: string;
  githubAccount: string;
  copyrightHolder?: string;
  copyrightStartYear: string;
  codacyId?: string;
}

export interface CmdOptionsGenerator {
  feature: CmdOption;
  name: CmdOption;
  bin: CmdOption;
  license: CmdOption;
  githubAccount: CmdOption;
  copyrightHolder: CmdOption;
  copyrightStartYear: CmdOption;
  codacyId: CmdOption;
}

export interface CoreProject extends GenerateActionOpts {
  name: string;
  bin: string;
  copyrightHolder: string;
  copyrightEndYear: number;
}

export type FieldStatus = 'ok' | 'todo' | 'fixable';

export interface Todo {
  description: string;
  status: string;
}

export type SupportedPackageJsonFieldType = PackageJson[keyof PackageJson];

export type toFieldStatus = (
  value: SupportedPackageJsonFieldType,
  fixed: SupportedPackageJsonFieldType
) => FieldStatus;

interface GenericPackageJson<T> {
  name: T;
  description: T;
  keywords: T;
  author: T;
  version: T;
  license: T;
  homepage: T;
  repository: T;
  type: T;
  exports: T;
  main: T;
  files: T;
  bin: T;
  engines: T;
  scripts: T;
  devDependencies: T;
  dependencies: T;
  peerDependencies: T;
}

export type PackageJsonStatusConverter = GenericPackageJson<toFieldStatus>;

export type PackageJsonStatus = GenericPackageJson<FieldStatus>;

type BadgePosition = 'top' | 'bottom';

export interface Badge {
  text: string;
  imageUrl: string;
  position: BadgePosition;
  refUrl?: string;
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

export type InstallationType = 'npm.dev' | 'npm.bin' | 'brew';

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
  /**
   * The npm script that should be run if any
   * [name, command]
   */
  npmScript?: [string, string];

  /**
   * The zsh alias that should be run if any
   * [name, command]
   */
  zshAlias?: [string, string];
}
export interface VsCodeSnippet {
  scope: string;
  prefix: string;
  body: string | string[];
  description: string;
}

export interface VsCodeSnippetObj {
  [key: string]: VsCodeSnippet;
}

export interface CmdOption {
  shortFlag: string;
  longFlag: string;
  description: string;
  defaultValue?: string | string[];
  choices: string[];
  mandatory: boolean;
  variadic: boolean;
}
type TermFormatterKind = 'intro' | 'info';
export type TermFormatterFormat = 'default' | 'human';

export interface TermFormatterParams {
  title: string;
  detail: string | object;
  kind: TermFormatterKind;
  format: TermFormatterFormat;
}

export interface ErrTermFormatterParams {
  title: string;
  detail: unknown;
}

export type TermFormatter = (params: TermFormatterParams) => void;

export type ErrTermFormatter = (params: ErrTermFormatterParams) => void;

export interface RunnerContext {
  currentPath: string;
  currentYear: number;
  termFormatter: TermFormatter;
  errTermFormatter: ErrTermFormatter;
}

export type GenerateAction = (
  ctx: RunnerContext,
  options: GenerateActionOpts
) => Promise<void>;
