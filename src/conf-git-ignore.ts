const gitIgnoreRows: string[] = [
  '*.log',
  '.DS_Store',
  'node_modules/',
  'dist/',
  'report/',
  '.message',
];

export const gitIgnoreConfig = gitIgnoreRows.join('\n');
