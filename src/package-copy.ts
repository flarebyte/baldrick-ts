import {
  CoreProject,
  Dependencies,
  GenerateActionOpts,
  RunnerContext,
  Scripts,
} from './model.js';
import { alwaysObj, trimString } from './utils.js';
import path from 'node:path';

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

const capitalize = (value: string): string =>
  value.length > 0 ? (value[0] || '').toUpperCase() + value.slice(1) : '';

export const computeCoreProject = (
  ctx: RunnerContext,
  generateOpts: GenerateActionOpts
): CoreProject => ({
  name: generateOpts.name ? generateOpts.name : path.basename(ctx.currentPath),
  bin: generateOpts.bin ? generateOpts.bin : path.basename(ctx.currentPath),
  githubAccount: generateOpts.githubAccount,
  license: generateOpts.license,
  feature: generateOpts.feature,
  copyrightHolder: generateOpts.copyrightHolder
    ? generateOpts.copyrightHolder
    : capitalize(generateOpts.githubAccount),
  copyrightStartYear: generateOpts.copyrightStartYear,
  copyrightEndYear: ctx.currentYear,
  codacyId: generateOpts.codacyId,
});
