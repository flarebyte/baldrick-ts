import { Dependencies, Scripts } from './model';
import { alwaysObj, trimString } from './utils';

export const copyScripts = (scripts: Scripts): Scripts =>
  Object.fromEntries(
    Object.entries(scripts).map(([key, value]) => [
      trimString(key),
      trimString(value),
    ])
  );

export const copyDependencies = (deps: Dependencies): Dependencies =>
  Object.fromEntries(
    Object.entries(alwaysObj(deps)).map(([key, value]) => [
      trimString(key),
      trimString(value),
    ])
  );
