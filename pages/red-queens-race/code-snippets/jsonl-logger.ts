import * as fs from 'node:fs';
import * as path from 'node:path';

import pino from 'pino';

// const logDir = path.join(__dirname, 'logs');
const logDir = '/home/djalil/scrapyard/logs';
const logFilePath = path.join(logDir, 'perf.jsonl');

// Ensure the directory exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

const fileLogger = pino(
  {
    level: 'debug',
  },
  logStream
);

process.on('exit', () => {
  logStream.end();
});

export default fileLogger;
