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
      .addOption(toCommanderOption(cmdOptionsGenerator.githubAccount))
      .action(async (options: GenerateRawOpts) => {
        const { feature, githubAccount } = options;
        const generateOpts: GenerateActionOpts = {
          feature: toFeatures(feature),
          githubAccount,
        };
        const ctx: RunnerContext = {
          currentPath: process.cwd(),
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
