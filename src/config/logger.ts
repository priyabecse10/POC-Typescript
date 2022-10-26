import pino from 'pino';
import moment from 'moment';

const logLevel = process.env.LOG_LEVEL || 'info';
const logConfig = {
  name: 'poc-todo- Server',
  level: logLevel,
  timestamp: () => `,"time":"${moment.utc()}"`,
  formatters: {
    level(lable: string, num: number) {
      return { level: lable };
    }
  }
};

const logger = pino(logConfig);

export default logger;