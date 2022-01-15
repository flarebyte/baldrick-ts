import {
  commandToMd,
  markdownToString,
  parseMarkdown,
} from '../src/markdown.js';
import { MdCommand, MdDocument } from '../src/model.js';
describe('Markdown documentation', () => {
  it('parse a markdown document', () => {
    const basicMarkdown = `
    # Main title
    
    ![npm](https://img.shields.io/npm/v/baldrick-ts) ![Build
    status](https://github.com/flarebyte/baldrick-ts/actions/workflows/main.yml/badge.svg)
    ![npm bundle size](https://img.shields.io/bundlephobia/min/baldrick-ts)

    ![npm type definitions](https://img.shields.io/npm/types/baldrick-ts)

    > main description
    > second part of description

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
    expect(actual.description).toEqual(
      'main description second part of description'
    );
    expect(actual.badges).toMatchInlineSnapshot(`
      Array [
        Object {
          "imageUrl": "https://img.shields.io/npm/v/baldrick-ts",
          "position": "top",
          "text": "npm",
        },
        Object {
          "imageUrl": "https://github.com/flarebyte/baldrick-ts/actions/workflows/main.yml/badge.svg",
          "position": "top",
          "text": "Build status",
        },
        Object {
          "imageUrl": "https://img.shields.io/bundlephobia/min/baldrick-ts",
          "position": "top",
          "text": "npm bundle size",
        },
        Object {
          "imageUrl": "https://img.shields.io/npm/types/baldrick-ts",
          "position": "top",
          "text": "npm type definitions",
        },
      ]
    `);
    expect(actual).toMatchInlineSnapshot(`
      Object {
        "badges": Array [
          Object {
            "imageUrl": "https://img.shields.io/npm/v/baldrick-ts",
            "position": "top",
            "text": "npm",
          },
          Object {
            "imageUrl": "https://github.com/flarebyte/baldrick-ts/actions/workflows/main.yml/badge.svg",
            "position": "top",
            "text": "Build status",
          },
          Object {
            "imageUrl": "https://img.shields.io/bundlephobia/min/baldrick-ts",
            "position": "top",
            "text": "npm bundle size",
          },
          Object {
            "imageUrl": "https://img.shields.io/npm/types/baldrick-ts",
            "position": "top",
            "text": "npm type definitions",
          },
        ],
        "description": "main description second part of description",
        "mainSection": "




      Some other info
      ",
        "sections": Array [
          Object {
            "body": "
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      ",
            "title": "Section Alpha",
          },
          Object {
            "body": "
      In eu mi bibendum neque egestas congue quisque.

      Sed risus ultricies tristique nulla aliquet enim tortor at.
      Auctor augue mauris augue neque gravida in fermentum et sollicitudin.
      ",
            "title": "Section Bravo",
          },
        ],
        "title": "Main title",
      }
    `);
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
    expect(actual).toMatchInlineSnapshot(`
      Object {
        "badges": Array [
          Object {
            "imageUrl": "https://img.shields.io/npm/v/scratchbook",
            "position": "top",
            "text": "npm",
          },
          Object {
            "imageUrl": "https://github.com/flarebyte/scratchbook/actions/workflows/main.yml/badge.svg",
            "position": "top",
            "text": "Build status",
          },
        ],
        "description": "main description",
        "mainSection": "



      Some other info
      ",
        "sections": Array [],
        "title": "Main title",
      }
    `);
  });

  it('should produces a markdown document', () => {
    const mdDoc: MdDocument = {
      title: 'The Title',
      description: 'The description',
      badges: [
        {
          text: 'badge text',
          imageUrl: 'http://site.com/badge',
          position: 'top',
        },
        {
          text: 'badge 2 text',
          imageUrl: 'http://othersite.com/badge',
          position: 'top',
        },
        {
          text: 'badge 3 text',
          imageUrl: 'http://bottomsite.com/badge',
          position: 'bottom',
        },
      ],
      mainSection: 'main 1\nmain 2\nmain 3',
      sections: [
        {
          title: 'Alpha',
          body: 'Lorem ipsum dolor sit amet',
        },
        {
          title: 'Bravo',
          body: 'In eu mi bibendum neque egestas congue quisque.',
        },
      ],
    };
    const actual = markdownToString(mdDoc);
    expect(actual).toMatchInlineSnapshot(`
      "# The Title

      ![badge text](http://site.com/badge) ![badge 2 text](http://othersite.com/badge)

      ![badge 3 text](http://bottomsite.com/badge)

      > The description

      main 1
      main 2
      main 3

      ## Alpha

      Lorem ipsum dolor sit amet

      ## Bravo

      In eu mi bibendum neque egestas congue quisque."
    `);
  });

  it('should produce some markdown for commands', () => {
    const cmd: MdCommand = {
      name: 'lint',
      title: 'Static code analysis',
      description: 'Analyse the code for syntax errors',
      motivation: 'Prevent bugs',
      context: 'Before compilation',
      run: 'yarn lint',
      partOf: {
        name: 'tsdx',
        installationType: 'npm.dev',
        description: 'Zero-config CLI for TypeScript package development',
        homepage: 'https://tsdx.io/',
        repository: {
          type: 'git',
          url: 'https://github.com/formium/tsdx',
        },
      },
      examples: ['yarn lint src', 'yarn lint --fix'],
    };
    const actual = commandToMd(cmd);
    expect(actual).toMatchInlineSnapshot(`
      "### Static code analysis

      > Analyse the code for syntax errors

      __Motivation:__ Prevent bugs

      __When to use it:__ Before compilation

      __Run:__ \`\`\`yarn lint\`\`\`

      __Examples:__

      \`\`\`yarn lint src\`\`\`

      \`\`\`yarn lint --fix\`\`\`

      __From package:__ [tsdx](https://tsdx.io/) of [npm](https://www.npmjs.com/) :  Zero-config CLI for TypeScript package development

      ---"
    `);
  });
});
