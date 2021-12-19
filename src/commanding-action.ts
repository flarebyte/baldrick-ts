import { updateAll } from './io-sfx.js';
import { GenerateAction, GenerateActionOpts, RunnerContext } from './model.js';

export const cmdGenerateAction: GenerateAction = async (
  ctx: RunnerContext,
  options: GenerateActionOpts
) => {
  await updateAll(ctx, options);
  ctx.termFormatter({
    title: 'Normalized the project structure and documents',
    detail: ['* Search for any fixme in your text editor'].join('\n'),
    kind: 'info',
    format: 'default',
  });
};
