import logger from './logger';
import { Sequelize } from 'sequelize';

const env = process.env.NODE_ENV || 'development';
// tslint:disable-next-line: no-var-requires
const config = require(`${__dirname}/../../db/config.json`)[env];

const db = new Sequelize(process.env[config.use_env_variable] as string, {
  logging: logger.debug.bind(logger)
});

export default db;