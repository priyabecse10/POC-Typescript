import {fastify,FastifyInstance} from 'fastify';
import routes from './routes';
import logger from './config/logger';
import {Server,IncomingMessage,ServerResponse} from 'http';



const server: FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
  >=fastify({logger});

  function build(){
    server.register(routes);
    return server;
  }

  export default build;