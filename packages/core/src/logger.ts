import { createLogger, format, transports } from 'winston';
import environment from './environment';

const { combine, label, timestamp, printf, colorize } = format;


const logFormat = printf(
  ({ level, message, label: logLabel, timestamp: logTimestamp }) => {
    return `${logTimestamp} [${logLabel}] ${level}: ${message}`;
  },
);

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    label({ label: environment.env}),
    colorize(),
    timestamp(),
    logFormat,
  ),
  transports: [
    new transports.Console()
  ]
});


export default logger;