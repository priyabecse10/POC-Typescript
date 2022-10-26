import { ValidationError } from 'sequelize';
import { BookPolicy } from '../policies';
import activityLogger from '../config/activity-logger';
import { getUserBook } from '../services/user.service';

import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

import {
  AddBookParams,
  BookUpdateParams,
  BookListQueryParams,
 } from '../types/book.controller';
import {
  add,
  update,
  filterAndPaginate,
  bookDelete,
  bookDetail,
  listAllBook,
  getBookById
  } from '../services/book.service';
import { BookInstance, UserInstance } from '../types';

function list(req: FastifyRequest, reply: FastifyReply) {
  const query = req.query as BookListQueryParams;
  const policy = new BookPolicy(req.currentUser);
  if (policy.canList()) {
    filterAndPaginate(query, req.currentUser)
      .then((book: any) => {
        reply.code(200).send(book);
      })
      .catch((error: FastifyError) => {
        reply.send(error);
      });
  } else {
    reply
      .code(403)
      .send({ errors: ['You are not allowed to perform this action'] });
  }
}

function listAll(req: FastifyRequest, reply: FastifyReply) {
  const currentUser = req.currentUser;
  const policy = new BookPolicy(currentUser);
  if (policy.canListAll()) {
    listAllBook(currentUser)
      .then((book: any) => {
        reply.code(200).send(book);
      })
      .catch((error: FastifyError) => {
        reply.send(error);
      });
  } else {
    reply
      .code(403)
      .send({ errors: ['You are not allowed to perform this action'] });
  }
}

function addBook(req: FastifyRequest, reply: FastifyReply) {
  const params = req.body as AddBookParams;
  const currentUser = req.currentUser;
  //const currentBook=req;
  const policy = new BookPolicy(currentUser);
  getUserBook(currentUser)
    .then((book:any) => {
      if (policy.canAdd(params)) {
        add(params)
          .then((book:any) => {
            activityLogger.log(currentUser, book, 'book', 'created');
            reply.code(201).send(book);
          })
          .catch((error: FastifyError) => {
            if (error instanceof ValidationError) {
              reply.send(error);
            } else {
              reply.code(422).send({ errors: [error.message] });
            }
          });
      } else {
        reply
          .code(403)
          .send({ errors: ['You are not allowed to perform this action'] });
      }
    });
  }
  


function updateBook(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  const attrs = req.body as BookUpdateParams;
  const { currentUser } = req;
  const policy = new BookPolicy(currentUser);
  getUserBook(currentUser)
  .then((book)=>{if (policy.canUpdate(id, attrs)) {
    update(id,book, attrs)
      .then((updatedBook) => {
        activityLogger.log(currentUser, updatedBook, 'book', 'updated');
        reply.code(200).send(updatedBook);
      })
      .catch((error: FastifyError) => {
        if (error instanceof ValidationError) {
          reply.send(error);
        } else {
          reply.code(422).send({ errors: [error.message] });
        }
      });
  } else {
    reply.code(403).send({ errors: ['You are not allowed to perform this action'] });
  }
}).catch((error) => {
  reply.send(error);
});  
}
    

function detail(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  const { currentUser } = req;
  const policy = new BookPolicy(currentUser);
  getBookById(id)
    .then(async (book:any) => {
      if (policy.canViewDetail(book)) {
        const BookDetail = await bookDetail(id);
        reply.send(BookDetail);
      } else {
        reply
          .code(403)
          .send({ errors: ['You are not allowed to perform this action'] });
      }
    })
    .catch((error:any) => {
      reply.send(error);
    });
}

function deleteBook(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  const { currentUser } = req;
  const policy = new BookPolicy(currentUser);
  getBookById(id)
    .then((book: any) => {
      if (policy.canDelete(book)) {
        bookDelete(id)
          .then((deletedBook) => {
            activityLogger.log(currentUser, deletedBook, 'book', 'deleted');
            reply.code(200).send({ message: 'Book deleted successfully' });
          })
          .catch((error: FastifyError) => {
            if (error instanceof ValidationError) {
              reply.send(error);
            } else {
              reply.code(422).send({ errors: [error.message] });
            }
          });
      } else {
        reply.code(403).send({ errors: ['You are not allowed to perform this action'] });
      }
    })
    .catch((error:any) => {
      reply.send(error);
    });
}

export {
  list,
  detail,
  listAll,
  addBook,
  updateBook,
  deleteBook,
};

