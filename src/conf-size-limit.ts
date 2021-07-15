import { CoreProject } from './model';

export const defaultSizeLimit = (coreProject: CoreProject) => [
  {
    path: `dist/${coreProject.name}.cjs.production.min.js`,
    limit: '5 KB',
  },
  {
    path: `dist/${coreProject.name}.esm.js`,
    limit: '5 KB',
  },
];
