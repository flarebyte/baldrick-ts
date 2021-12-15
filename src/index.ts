import { cmdGenerateAction } from './commanding-action.js';
import { Commanding } from './commanding.js';

const commanding = new Commanding();

commanding.declareGenerateAction(cmdGenerateAction);

export { commanding };
