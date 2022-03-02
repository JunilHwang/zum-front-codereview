import { createLogger, format, transports } from 'winston';
import WinstonDaily from 'winston-daily-rotate-file';

const DEV = 'development';
const TEST = 'test';
const PRODUCTION = 'production';

const myFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

let [errorDir, infoDir] = ['logs/prod/error', 'logs/prod'];
switch (process.env.NODE_ENV) {
  case DEV:
    [errorDir, infoDir] = ['logs/dev/error', 'logs/dev'];
    break;
  case TEST:
    [errorDir, infoDir] = ['logs/test/error', 'logs/test'];
    break;
  case PRODUCTION:
    break;
  default:
    console.error('check NODE_ENV');
    break;
}

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.splat(),
    format.json(),
    myFormat,
  ),
  transports: [
    new WinstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: errorDir,
      filename: `%DATE%.error.log`,
      maxFiles: '30d',
      zippedArchive: true,
    }),
    new WinstonDaily({
      level: 'info',
      datePattern: 'YYYY-MM-DD',
      dirname: infoDir,
      filename: `%DATE%.debug.log`,
      maxFiles: '30d',
      zippedArchive: true,
    }),
  ],
});

if (process.env.NODE_ENV !== PRODUCTION) {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
  );
}

export default logger;
