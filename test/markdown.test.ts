import {
  codeOfConductMd,
  contributingMd,
  maintenanceMd,
  parseMarkdown,
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
  it('parse a markdown document', () => {
    const basicMarkdown = `
    # Main title
    
    ![npm](https://img.shields.io/npm/v/scratchbook)
    ![Build status](https://github.com/flarebyte/scratchbook/actions/workflows/main.yml/badge.svg)

    > main description

    Some other info

    ## Section Alpha

    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
    
    ## Section Bravo

    In eu mi bibendum neque egestas congue quisque.
    
    Sed risus ultricies tristique nulla aliquet enim tortor at.
    Auctor augue mauris augue neque gravida in fermentum et sollicitudin. 
    
    `;
    const actual = parseMarkdown(basicMarkdown);
    expect(actual.title).toEqual('Main title');
    expect(actual.description).toEqual('main description');
    expect(actual.badges).toEqual([
      { text: 'npm', url: 'https://img.shields.io/npm/v/scratchbook' },
      {
        text: 'Build status',
        url:
          'https://github.com/flarebyte/scratchbook/actions/workflows/main.yml/badge.svg',
      },
    ]);
    expect(actual.mainSection.trim()).toEqual('Some other info');
    expect(actual.sections).toHaveLength(2);
    expect(actual.sections[0].title).toEqual('Section Alpha');
    expect(actual.sections[1].title).toEqual('Section Bravo');
    expect(actual.sections[0].body.split('\n')).toHaveLength(7);
    expect(actual.sections[1].body.split('\n')).toHaveLength(6);
    expect(actual.sections[0].body).toContain('Lorem ipsum dolor');
    expect(actual.sections[0].body).toContain('nulla pariatur.');
    expect(actual.sections[1].body).toContain('In eu mi bibendum');
    expect(actual.sections[1].body).toContain('et sollicitudin.');
  });
  
  it('parse a markdown document without any secondary sections', () => {
    const basicMarkdown = `
    # Main title
    
    ![npm](https://img.shields.io/npm/v/scratchbook)
    ![Build status](https://github.com/flarebyte/scratchbook/actions/workflows/main.yml/badge.svg)

    > main description

    Some other info
    `;
    const actual = parseMarkdown(basicMarkdown);
    expect(actual.title).toEqual('Main title');
    expect(actual.description).toEqual('main description');
    expect(actual.badges).toHaveLength(2);
    expect(actual.mainSection.trim()).toEqual('Some other info');
    expect(actual.sections).toHaveLength(0);
  });
});
