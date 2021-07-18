import { readFileSync, writeFileSync } from './barrel';
import { codeOfConductMd } from './markdown-code-of-conduct';
import { contributingMd } from './markdown-contributing';
import { toReadmeMd } from './markdown-readme';
import { CoreProject, PackageJson, ProjectConfig } from './model';
import { fixAutomatically } from './package';
import { packageToCoreProject } from './package-copy';
import { fromString, toString } from './package-io';

const readBaldrickConfig = (): ProjectConfig => {
  const projectConfig: ProjectConfig = JSON.parse(
    readFileSync('./baldrick.json', 'utf8')
  );
  return projectConfig;
};

const readPackageJson = (): PackageJson => {
  const packageJson = fromString(readFileSync('./package.json', 'utf8'));
  return packageJson;
};

const writePackageJson = (packageJson: PackageJson) => {
  writeFileSync('./package.json', toString(packageJson), 'utf8');
};

const readReadme = (): string => {
  return readFileSync('./README.md', 'utf8');
};

const writeReadme = (core: CoreProject) => {
  const existingReadme = readReadme();
  const newReadme = toReadmeMd(core, existingReadme);
  writeFileSync('./README.md', newReadme, 'utf8');
};

const writeCodeOfConducts = () => {
  writeFileSync('./CODE_OF_CONDUCT.md', codeOfConductMd, 'utf8');
};

const writeContributing = () => {
  writeFileSync('./CONTRIBUTING.md', contributingMd, 'utf8');
};

export const updateAll = () => {
  const existingPackageJson = readPackageJson();
  const projectConfig = readBaldrickConfig();
  const coreProject = packageToCoreProject(projectConfig, existingPackageJson);
  const newPackageJson = fixAutomatically(projectConfig, existingPackageJson);
  writePackageJson(newPackageJson);
  writeReadme(coreProject);
  writeCodeOfConducts();
  writeContributing();
};
