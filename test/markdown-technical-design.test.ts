import { libCoreProject } from './fixture-core-project.js';
import { CoreProject } from '../src/model.js';
import { toTechnicalDesignMd } from '../src/markdown-technical-design.js';

const exampleReadme = `
# Technical Design

## Overview

### Audience

### Purpose

### Code structure

### Useful links

`;

describe('Technical Design documentation', () => {
  it('Updates TECHNICAL_DESIGN.md with standardized chapters', () => {
    const project: CoreProject = {
      ...libCoreProject,
      name: 'project123',
    };
    const actual = toTechnicalDesignMd(project, exampleReadme);
    expect(actual).toMatchSnapshot();
  });
});
