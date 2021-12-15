import {
  CoreProject,
  Dependencies,
  GenerateActionOpts,
  RunnerContext,
  Scripts,
} from './model.js';
import { alwaysObj, trimString } from './utils.js';
import path from 'path';

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

export const computeCoreProject = (
  ctx: RunnerContext,
  generateOpts: GenerateActionOpts
): CoreProject => ({
  name: path.basename(ctx.currentPath),
  githubAccount: generateOpts.githubAccount,
  licenseType: 'MIT',
  feature: generateOpts.feature,
});
