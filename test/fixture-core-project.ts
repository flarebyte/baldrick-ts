import {
  CoreProject,
  LicenseType,
  PipelineType,
  ProjectConfig,
  ProjectType,
  ScaffoldingType,
} from '../src/model';

export const libCoreProject: CoreProject = {
  name: 'project123',
  githubAccount: 'mycompany',
  sizeLimitKB: 5,
  projectType: ProjectType.TsLib,
  licenseType: LicenseType.MIT,
  scaffoldingType: ScaffoldingType.TsDx,
  pipelineType: PipelineType.Github,
};

export const myProjectConfig: ProjectConfig = {
  githubAccount: 'mycompany',
  sizeLimitKB: 5,
};
