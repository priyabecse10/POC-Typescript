import loginRouterOpts from './sessions-login.router-option';

import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';

import {
  login,
} from '../../controller/sessions.controller';

function sessionsPublicRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.post('/login', loginRouterOpts, login);
  next();
}
export default sessionsPublicRoutes;
