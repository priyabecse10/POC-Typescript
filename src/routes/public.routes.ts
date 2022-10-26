import { FastifyInstance } from 'fastify';
import {userRoutes} from './user/index';
import { sessionsPublicRoutes } from './sessions';
import { Server, ServerResponse, IncomingMessage } from 'http';
//import { BookInstance, UserInstance } from '../types';

function publicRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
    fastify.register(userRoutes);
     fastify.register(sessionsPublicRoutes);
  next();
}

export default publicRoutes;
