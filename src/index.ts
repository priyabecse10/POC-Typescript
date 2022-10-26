import * as dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/../.env` });

import build from './application';

const port = process.env.PORT || 8080;

const fastify = build()

fastify.get('/', async (request, reply) => {
  return 'Hello there! 👋'
})

const start = async () => {
    try {
      await fastify.listen(port, '0.0.0.0');
    } catch (error) {
      fastify.log.error(error);
      process.exit(1);
    }
  };
  
  start();
