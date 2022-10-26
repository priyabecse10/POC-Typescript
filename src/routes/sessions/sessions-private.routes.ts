import logoutRouterOpts from './sessions-logout.router-option';

import { logout } from '../../controller/sessions.controller';
import { FastifyInstance } from 'fastify';

import { IncomingMessage, Server, ServerResponse } from 'http';

function sessionsPrivateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.delete('/logout', logoutRouterOpts, logout);
  next();
}
export default sessionsPrivateRoutes;
