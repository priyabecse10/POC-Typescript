import addUserRouterOpts from './user-add.router-option';
import listUserRouterOpts from './user-list.router-option';
import userDetailRouterOpts from './user-detail.router-option';
import updateUserRouterOpts from './user-update.router-option';
import deleteUserRouterOpts from './user-delete.router-option';

import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';

import {
  list,
  detail,
  addUser,
  updateUser,
  deleteUser
} from '../../controller/user.controller';

function userRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.post('/user/create', addUserRouterOpts, addUser);
  fastify.get('/users', listUserRouterOpts, list);
  fastify.get('/users/:id', userDetailRouterOpts, detail);
  fastify.put('/users/:id', updateUserRouterOpts, updateUser);
  fastify.delete('/users/:id', deleteUserRouterOpts, deleteUser);
  next();
}
export default userRoutes;