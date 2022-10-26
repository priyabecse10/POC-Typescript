import addUserAuthHook from '../hooks/user-authentication.hook';

import { BookInstance, UserInstance } from '../types';
import { FastifyInstance } from 'fastify';
import { sessionsPrivateRoutes } from './sessions';
import { bookPrivateRoutes } from './book';
import { IncomingMessage, Server, ServerResponse } from 'http';

declare module 'fastify' {
  interface FastifyRequest {
    currentUser: UserInstance;
    }
}

function privateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  addUserAuthHook(fastify);
  fastify.register(sessionsPrivateRoutes);
  fastify.register(bookPrivateRoutes);

  next();
}

export default privateRoutes;
