interface GlossaryDefinition {
  title: string;
  description: string;
  link: string;
  motivation: string;
}

const glossaryDefs: GlossaryDefinition[] = [
  {
    title: 'Higher-Order Function',
    description: [
      'A higher-order function (HOF) is:',
      '- A function which takes a function as an argument',
      '- Or a function which returns a function',
    ].join('\n'),
    link: 'https://en.wikipedia.org/wiki/Higher-order_function',
    motivation: [
      '- Reduce code duplication',
      '- Encourage the single-responsibility principle',
    ].join('\n'),
  },
  {
    title: 'Currying and closure',
    description: [
      'These two related concepts in Typescript:',
      ' - Closure provides a way of binding a context to a function',
      ' - Currying converts a function that takes multiple arguments into a function that takes them one at a time.',
      'Example: `const f = x => y => x + y;`',
    ].join('\n'),
    link: 'https://en.wikipedia.org/wiki/Currying',
    motivation: [
      '- Make it possible to have function with a single parameter that can be used for `.map` or `.filter` while some specific context has been provided before hand',
      '- Make it easier to use Point-Free Style',
    ].join('\n\n'),
  },
  {
    title: 'Purity',
    description: [
      'A function is pure if the return value is only determined by its parameters',
    ].join('\n'),
    link: 'https://en.wikipedia.org/wiki/Pure_function',
    motivation: [
      '- Make it possible to predict the output based on the input',
      '- Easier to test',
    ].join('\n'),
  },
  {
    title: 'Side effects',
    description: [
      'A function has side effects if the output cannot be predicted just by looking at its input parameters',
    ].join('\n'),
    link: 'https://en.wikipedia.org/wiki/Side_effect_(computer_science)',
    motivation: [
      '- Side effects is not desirable from a testing perspective but likely necessary in a real world environment',
      '- Identify side effects to isolate them in a limited number of functions',
    ].join('\n\n'),
  },
  {
    title: 'Point-Free Style',
    description: [
      'Point-Free Style allows to chain functions in a very linear way',
    ].join('\n'),
    link: 'https://en.wikipedia.org/wiki/Tacit_programming',
    motivation: [
      '- Avoid the creation of intermediate variables',
      '- In best cases increases the readability',
    ].join('\n'),
  },
];

const glossaryDefToString = (gdef: GlossaryDefinition): string =>
  [
    `## ${gdef.title}`,
    gdef.description,
    '__Motivation:__',
    gdef.motivation,
    `More about [${gdef.title}](${gdef.link})`,
  ].join('\n\n');

export const glossaryMd = (): string => {
  const defs = glossaryDefs.map(glossaryDefToString).join('\n\n');
  return [
    '# Glossary',
    'Glossary of the key terms for functional and object oriented programming. Some additional references:',
    ' - [Functional programming jargon](https://github.com/hemanth/functional-programming-jargon)',
    ' - [FP glossary](https://degoes.net/articles/fp-glossary)',
    defs,
  ].join('\n');
};
