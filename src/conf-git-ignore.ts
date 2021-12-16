const gitIgnoreRows: string[] = [
  '*.log',
  '.DS_Store',
  'node_modules/',
  'dist/',
  'report/',
];

export const gitIgnoreConfig = gitIgnoreRows.join('\n');
