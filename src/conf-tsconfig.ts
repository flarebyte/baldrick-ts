export const defaultTsConfig = {
  extends: 'baldrick-tsconfig-es2020',
  compilerOptions: {
    module: 'es2022',
    moduleResolution: 'node',
    allowSyntheticDefaultImports: true,
    diagnostics: true,
    listFiles: true,
    extendedDiagnostics: true,
  },
  'ts-node': {
    transpileOnly: true,
    files: true,
    compilerOptions: {},
  },
};
