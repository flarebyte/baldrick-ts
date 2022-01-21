import { readFile, writeFile, appendFile, mkdir } from 'node:fs/promises';
import YAML from 'yaml';
import { codeOfConductMd } from './markdown-code-of-conduct.js';
import { contributingMd } from './markdown-contributing.js';
import { toReadmeMd } from './markdown-readme.js';
import {
  CoreProject,
  CustomizedPackageJson,
  GenerateActionOpts,
  PackageJson,
  RunnerContext,
} from './model.js';
import {
  defaultCustomizedPackageJson,
  fixAutomatically,
  suggestTasksToDo,
} from './package.js';
import { computeCoreProject } from './package-copy.js';
import { fromString, toString } from './package-io.js';
import {
  getCommandHelp,
  getZshAliases,
  maintenanceMd,
} from './markdown-maintenance.js';
import { defaultPrettier } from './conf-prettier.js';
import { gitIgnoreConfig } from './conf-git-ignore.js';
import { defaultTsConfig } from './conf-tsconfig.js';
import { defaultGithubWorkflow } from './conf-workflow.js';
import { pullRequestMd } from './markdown-pull-request.js';
import { featureRequest } from './yaml-feature-request.js';
import { bugReport } from './yaml-bug-report.js';
import { editorConfig } from './conf-editor-config.js';
import { vsCodeSnippets } from './conf-vscode-snippet.js';
import { licenseMd } from './markdown-license.js';
import { toTechnicalDesignMd } from './markdown-technical-design.js';
import { commitMessage } from './commit-message.js';
import { glossaryMd } from './markdown-glossary.js';

export const toJsonString = (value: object): string => {
  return JSON.stringify(value, undefined, 2);
};

export const toYamlString = (value: object): string => {
  return YAML.stringify(value);
};

const readCustomizedPackageJson = async (): Promise<CustomizedPackageJson> => {
  try {
    const content = await readFile('./package.json', 'utf8');
    return fromString(content);
  } catch {
    return defaultCustomizedPackageJson;
  }
};

const writePackageJson = async (packageJson: PackageJson) => {
  await writeFile('./package.json', toString(packageJson), 'utf8');
};

const readReadme = async (): Promise<string> => {
  try {
    return await readFile('./README.md', 'utf8');
  } catch {
    return '';
  }
};

const writeReadme = async (core: CoreProject) => {
  const existingReadme = await readReadme();
  const newReadme = toReadmeMd(core, existingReadme);
  await writeFile('./README.md', newReadme, 'utf8');
};

const readTechnicalDesign = async (): Promise<string> => {
  try {
    return await readFile('./TECHNICAL_DESIGN.md', 'utf8');
  } catch {
    return '';
  }
};

const writeTechnicalDesign = async (core: CoreProject) => {
  const existingTechnicalDesign = await readTechnicalDesign();
  const newTechnicalDesign = toTechnicalDesignMd(core, existingTechnicalDesign);
  await writeFile('./TECHNICAL_DESIGN.md', newTechnicalDesign, 'utf8');
};

const writeCodeOfConducts = async (proj: CoreProject) => {
  await writeFile('./CODE_OF_CONDUCT.md', codeOfConductMd(proj), 'utf8');
};

const writeContributing = async () => {
  await writeFile('./CONTRIBUTING.md', contributingMd, 'utf8');
};

const writeMaintenance = async (proj: CoreProject) => {
  await writeFile('./MAINTENANCE.md', maintenanceMd(proj), 'utf8');
};

const writePrettierConfig = async () => {
  await writeFile('.prettierrc.json', toJsonString(defaultPrettier), 'utf8');
};

const writeGitIgnore = async () => {
  await writeFile('.gitignore', gitIgnoreConfig, 'utf8');
};

const writeEditorConfig = async () => {
  await writeFile('.editorconfig', editorConfig, 'utf8');
};

const writeTsConfig = async () => {
  await writeFile('./tsconfig.json', toJsonString(defaultTsConfig), 'utf8');
};

const writeLicense = async (proj: CoreProject) => {
  await writeFile('./LICENSE', licenseMd(proj), 'utf8');
};

const createGithubWorkflowDir = async () => {
  await mkdir('.github/workflows', { recursive: true });
  await mkdir('.github/ISSUE_TEMPLATE', { recursive: true });
};

const writeWorkflowConfig = async (core: CoreProject) => {
  await writeFile(
    '.github/workflows/main.yml',
    toYamlString(defaultGithubWorkflow(core)),
    'utf8'
  );
};

const writePullRequestMd = async () => {
  await writeFile('.github/pull_request_template.md', pullRequestMd, 'utf8');
};

const writeFeatureRequestYaml = async () => {
  await writeFile(
    '.github/ISSUE_TEMPLATE/feature_request.yaml',
    toYamlString(featureRequest),
    'utf8'
  );
};

const writeBugReportYaml = async () => {
  await writeFile(
    '.github/ISSUE_TEMPLATE/bug_report.yaml',
    toYamlString(bugReport),
    'utf8'
  );
};

const createVisualCodeDir = async () => {
  await mkdir('.vscode', { recursive: true });
};

const writeVsCodeSnippets = async () => {
  await writeFile(
    '.vscode/baldrick.code-snippets',
    toJsonString(vsCodeSnippets),
    'utf8'
  );
};

const createSourceDir = async () => {
  await mkdir('src', { recursive: true });
  await mkdir('test', { recursive: true });
};

const appendCommitMessage = async () => {
  await appendFile('.message', commitMessage(), 'utf8');
};

const writeZshAlias = async (core: CoreProject) => {
  await writeFile('.aliases.zsh', getZshAliases(core), 'utf8');
};

const writeCommandHelp = async (core: CoreProject) => {
  await writeFile('commands.txt', getCommandHelp(core), 'utf8');
};

const writeGlossary = async () => {
  await writeFile('GLOSSARY.md', glossaryMd(), 'utf8');
};

export const updateAll = async (
  ctx: RunnerContext,
  opts: GenerateActionOpts
) => {
  try {
    const coreProject = computeCoreProject(ctx, opts);
    const customizedPackageJson = await readCustomizedPackageJson();
    const newPackageJson = fixAutomatically(coreProject, customizedPackageJson);
    await writePackageJson(newPackageJson);
    await writeReadme(coreProject);
    await createSourceDir();
    await writeCodeOfConducts(coreProject);
    await writeContributing();
    await writeMaintenance(coreProject);
    await writeTechnicalDesign(coreProject);
    await writePrettierConfig();
    await writeGitIgnore();
    await writeEditorConfig();
    await writeTsConfig();
    await writeLicense(coreProject);
    await createGithubWorkflowDir();
    await writeWorkflowConfig(coreProject);
    await writePullRequestMd();
    await writeFeatureRequestYaml();
    await writeBugReportYaml();
    await createVisualCodeDir();
    await writeVsCodeSnippets();
    await writeZshAlias(coreProject);
    await writeCommandHelp(coreProject);
    await writeGlossary();
    await appendCommitMessage();
    const todos = suggestTasksToDo(coreProject, newPackageJson);
    for (const todo of todos)
      ctx.termFormatter({
        title: todo.status,
        detail: todo.description,
        kind: 'info',
        format: 'default',
      });
  } catch (error) {
    ctx.errTermFormatter({
      title: 'Generating - update error',
      detail: error,
    });
    throw error;
  }
};
