import { Command } from 'commander';
import { cmdOptionsGenerator } from './commanding-data.js';
import { toCommanderOption } from './commanding-helper.js';
import { toFeatures } from './feature-helper.js';
import {
  GenerateAction,
  GenerateActionOpts,
  GenerateRawOpts,
  RunnerContext,
} from './model.js';
import { basicFormatter, errorFormatter } from './term-formatter.js';
import { version } from './version.js';

export class Commanding {
  _program: Command = new Command();
  constructor() {
    this._program.version(version);
  }

  declareGenerateAction(genAction: GenerateAction) {
    this._program
      .command('generate')
      .description('Generate and standardize the source code files')
      .addOption(toCommanderOption(cmdOptionsGenerator.feature))
      .addOption(toCommanderOption(cmdOptionsGenerator.name))
      .addOption(toCommanderOption(cmdOptionsGenerator.githubAccount))
      .addOption(toCommanderOption(cmdOptionsGenerator.copyrightHolder))
      .addOption(toCommanderOption(cmdOptionsGenerator.copyrightStartYear))
      .addOption(toCommanderOption(cmdOptionsGenerator.license))
      .addOption(toCommanderOption(cmdOptionsGenerator.bin))
      .addOption(toCommanderOption(cmdOptionsGenerator.codacyId))
      .action(async (options: GenerateRawOpts) => {
        const {
          feature,
          name,
          githubAccount,
          copyrightHolder,
          license,
          copyrightStartYear,
          bin,
          codacyId,
        } = options;
        const generateOpts: GenerateActionOpts = {
          feature: toFeatures(feature),
          name,
          githubAccount,
          copyrightHolder,
          license,
          copyrightStartYear: Number.parseInt(copyrightStartYear),
          bin,
          codacyId,
        };
        const ctx: RunnerContext = {
          currentPath: process.cwd(),
          currentYear: new Date().getFullYear(),
          termFormatter: basicFormatter,
          errTermFormatter: errorFormatter,
        };
        await genAction(ctx, generateOpts);
      });
  }

  async parseAsync(argv: string[]) {
    return await this._program.parseAsync(argv, { from: 'node' });
  }

  async parseAsyncArgv() {
    return await this.parseAsync(process.argv);
  }
}
