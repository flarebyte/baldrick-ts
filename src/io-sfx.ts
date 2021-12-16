import { readFile, writeFile } from 'fs/promises';
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
import { defaultCustomizedPackageJson, fixAutomatically } from './package.js';
import { computeCoreProject } from './package-copy.js';
import { fromString, toString } from './package-io.js';
import { maintenanceMd } from './markdown-maintenance.js';

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

const writeCodeOfConducts = async () => {
  await writeFile('./CODE_OF_CONDUCT.md', codeOfConductMd, 'utf8');
};

const writeContributing = async () => {
  await writeFile('./CONTRIBUTING.md', contributingMd, 'utf8');
};

const writeMaintenance = async () => {
  await writeFile('./MAINTENANCE.md', maintenanceMd, 'utf8');
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
    await writeCodeOfConducts();
    await writeContributing();
    await writeMaintenance();
  } catch (err) {
    ctx.errTermFormatter({
      title: 'Generating - update error',
      detail: err,
    });
    throw err;
  }
};
