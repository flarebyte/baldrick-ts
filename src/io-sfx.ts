import { readFile, writeFile, mkdir } from 'fs/promises';
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
import { maintenanceMd } from './markdown-maintenance.js';
import { defaultPrettier } from './conf-prettier.js';
import { gitIgnoreConfig } from './conf-git-ignore.js';
import { defaultTsConfig } from './conf-tsconfig.js';
import { defaultGithubWorkflow } from './conf-workflow.js';
import { pullRequestMd } from './markdown-pull-request.js';
import { featureRequestMd } from './markdown-feature-request.js';
import { bugReportMd } from './markdown-bug-report.js';
import { editorConfig } from './conf-editor-config.js';
import { vsCodeSnippets } from './conf-vscode-snippet.js';
import { licenseMd } from './markdown-license.js';
import { toTechnicalDesignMd } from './markdown-technical-design.js';

export const toJsonString = (value: object): string => {
  return JSON.stringify(value, null, 2);
};

export const toYamlString = (value: object): string => {
  return YAML.stringify(value);
};

const readCustomizedPackageJson = async (): Promise<CustomizedPackageJson> => {
  try {
    const content = await readFile('./package.json', 'utf8');
    return fromString(content);
  } catch (err) {
    return Promise.resolve(defaultCustomizedPackageJson);
  }
};

const writePackageJson = async (packageJson: PackageJson) => {
  await writeFile('./package.json', toString(packageJson), 'utf8');
};

const readReadme = async (): Promise<string> => {
  try {
    return await readFile('./README.md', 'utf8');
  } catch (err) {
    return Promise.resolve('');
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
  } catch (err) {
    return Promise.resolve('');
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

const writeWorkflowConfig = async () => {
  await writeFile(
    '.github/workflows/main.yml',
    toYamlString(defaultGithubWorkflow),
    'utf8'
  );
};

const writePullRequestMd = async () => {
  await writeFile('.github/pull_request_template.md', pullRequestMd, 'utf8');
};

const writeFeatureRequestMd = async () => {
  await writeFile(
    '.github/ISSUE_TEMPLATE/feature_request.md',
    featureRequestMd,
    'utf8'
  );
};

const writeBugReportMd = async () => {
  await writeFile('.github/ISSUE_TEMPLATE/bug_report.md', bugReportMd, 'utf8');
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
    await writeWorkflowConfig();
    await writePullRequestMd();
    await writeFeatureRequestMd();
    await writeBugReportMd();
    await createVisualCodeDir();
    await writeVsCodeSnippets();
    const todos = suggestTasksToDo(coreProject, newPackageJson);
    todos.forEach((todo) =>
      ctx.termFormatter({
        title: todo.status,
        detail: todo.description,
        kind: 'info',
        format: 'default',
      })
    );
  } catch (err) {
    ctx.errTermFormatter({
      title: 'Generating - update error',
      detail: err,
    });
    throw err;
  }
};
