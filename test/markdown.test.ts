import {
  codeOfConductMd,
  contributingMd,
  maintenanceMd,
  toReadmeMd,
} from '../src/markdown';
import {
  LicenseType,
  PipelineType,
  ProjectType,
  ScaffoldingType,
} from '../src/model';
describe('Markdown documentation', () => {
  it('normalizes CONTRIBUTING.md', () => {
    expect(contributingMd).toBeDefined();
  });
  it('normalizes CODE_OF_CONDUCT.md', () => {
    expect(codeOfConductMd).toBeDefined();
  });

  it('normalizes MAINTENANCE.md', () => {
    expect(maintenanceMd).toBeDefined();
  });
  it('Updates README.md with standardized chapters', () => {
    const coreProject = {
      name: 'project123',
      githubAccount: 'mycompany',
      projectType: ProjectType.TsLib,
      licenseType: LicenseType.MIT,
      scaffoldingType: ScaffoldingType.TsDx,
      pipelineType: PipelineType.Github,
    };
    const existingReadme = `
    # About this doc
    `;
    const actual = toReadmeMd(coreProject, existingReadme);
    expect(actual).toBeDefined();
  });
});
