import {
  LicenseType,
  PipelineType,
  ProjectType,
  ScaffoldingType,
} from '../src/model';

export const libCoreProject = {
  name: 'project123',
  githubAccount: 'mycompany',
  projectType: ProjectType.TsLib,
  licenseType: LicenseType.MIT,
  scaffoldingType: ScaffoldingType.TsDx,
  pipelineType: PipelineType.Github,
};
