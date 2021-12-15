import { commanding } from './index.js';

/**
 * This function may be merged in the future when the linter does a better job at recognizing .mts files
 */
export async function runClient() {
  try {
    await commanding.parseAsyncArgv();
  } catch (err) {
    console.log('baldrick-ts generator will exit with error code 1');
    console.error(err);
    process.exit(1);
  }
}
