import addBookRouterOpts from './book-add.router-option';
import listBookRouterOpts from './book-list.router-option';
import updateBookRouterOpts from './book-update.router-option';
import bookDetailRouterOpts from './book-detail.router-option';
import deleteBookRouterOpts from './book-delete.router-option';
import listAllBookRouterOpts from './book-list-all.router-option';
import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';

import {
  list,
  detail,
  listAll,
  addBook,
  deleteBook,
  updateBook
} from '../../controller/book.controller';

function bookPrivateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.post('/book/add', addBookRouterOpts, addBook);
  fastify.get('/book/list', listBookRouterOpts, list);
  fastify.get('/book/list/:id', bookDetailRouterOpts, detail);
  fastify.get('/book/listAll', listAllBookRouterOpts, listAll);
  fastify.put('/book/update/:id', updateBookRouterOpts, updateBook);
  fastify.delete('/book/delete/:id', deleteBookRouterOpts, deleteBook);
  next();
}
export default bookPrivateRoutes;
