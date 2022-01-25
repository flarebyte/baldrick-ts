import { CoreProject } from './model.js';

export const defaultGithubWorkflow = (proj: CoreProject) => ({
  name: 'CI',
  on: ['push'],
  jobs: {
    build: {
      name: 'Build, lint, and test on Node ${{ matrix.node }} and ${{ matrix.os }}',
      'runs-on': '${{ matrix.os }}',
      strategy: {
        matrix: {
          node: ['14.x', '16.x'],
          os: ['ubuntu-latest', 'macOS-latest'],
        },
      },
      steps: [
        {
          name: 'Checkout repo',
          uses: 'actions/checkout@v2',
        },
        {
          name: 'Use Node ${{ matrix.node }}',
          uses: 'actions/setup-node@v2',
          with: {
            'node-version': '${{ matrix.node }}',
          },
        },
        {
          name: 'Installation',
          run: 'yarn install',
        },
        {
          name: 'Static code analysis',
          run: proj.feature.includes('no:lint')
            ? 'yarn lint:ci || echo "Some linting failed"'
            : 'yarn lint:ci',
        },
        {
          name: 'Test',
          run: proj.feature.includes('no:test')
            ? 'yarn test:ci || echo "Some unit tests failed"'
            : 'yarn test:ci',
        },
        {
          name: 'Build',
          run: 'yarn build',
        },
      ],
    },
  },
});
