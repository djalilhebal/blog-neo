import { performance } from 'node:perf_hooks';

import { Logger } from 'pino';

import jsonlLogger from './jsonl-logger';

type RunnableFunc = () => (void | Promise<void>);

enum KiType {
  FILE = 'FILE',

  PERF_MEM = 'PERF_MEM',

  PERF_EXEC = 'PERF_EXEC',
}

export async function withExecutionTime(logger: Logger | null, fn: RunnableFunc) {
  logger = logger ?? jsonlLogger;

  const startTime = performance.now();

  try {
    await fn();
  } catch (error) {
    logger.error(error);
  }

  const endTime = performance.now();
  const elapsedTime = endTime - startTime;

  logger.info({
    kiType: KiType.PERF_EXEC,
    msg: 'Execution time',
    elapsedTime,
  });
}

/**
 * Ensure you run this script with the `--expose-gc` flag, e.g., node --expose-gc script.js
 */
export async function withMemoryUsage(logger: Logger | null, fn: RunnableFunc) {
  logger = logger ?? jsonlLogger;

  if (typeof global.gc !== 'function') {
    throw new Error('The program was not run with --expose-gc');
  }

  try {
    // Force GC. Starting from a clean memory state for better comparison.
    global.gc();
    const initialMemory = process.memoryUsage();
    logger.info({
      kiType: KiType.PERF_MEM,
      msg: 'initialMemory',
      memoryUsage: initialMemory,
    });

    await withExecutionTime(logger, fn);

    const intermediateMemory = process.memoryUsage();
    logger.info({
      kiType: KiType.PERF_MEM,
      msg: 'intermediateMemory',
      memoryUsage: intermediateMemory,
    });

    global.gc();
    const finalMemory = process.memoryUsage();
    logger.info({
      kiType: KiType.PERF_MEM,
      msg: 'finalMemory',
      memoryUsage: finalMemory,
    });

  } catch (error) {
    logger.error(error);
  }
}
