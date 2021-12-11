import {
  CoreProject,
  Dependencies,
  LicenseType,
  PackageJson,
  PipelineType,
  ProjectConfig,
  ProjectType,
  ScaffoldingType,
  Scripts,
} from './model';
import { alwaysObj, trimString } from './utils';

export const copyScripts = (scripts: Scripts): Scripts =>
  Object.fromEntries(
    Object.entries(scripts).map((keyVal) => [
      trimString(keyVal[0]),
      trimString(keyVal[1]),
    ])
  );

export const copyDependencies = (deps: Dependencies): Dependencies =>
  Object.fromEntries(
    Object.entries(alwaysObj(deps)).map((keyVal) => [
      trimString(keyVal[0]),
      trimString(keyVal[1]),
    ])
  );

const hasDependency = (name: string, dependencies: Dependencies): boolean =>
  Object.keys(dependencies).includes(name);

export const packageToCoreProject = (
  projectConfig: ProjectConfig,
  packageJson: PackageJson
): CoreProject => ({
  name: packageJson.name,
  githubAccount: projectConfig.githubAccount,
  sizeLimitKB: projectConfig.sizeLimitKB,
  licenseType:
    packageJson.license === 'MIT' ? LicenseType.MIT : LicenseType.Other,
  scaffoldingType: hasDependency('tsdx', packageJson.devDependencies)
    ? ScaffoldingType.TsDx
    : ScaffoldingType.Other,
  pipelineType: PipelineType.Github,
  projectType: ProjectType.TsLib,
});
