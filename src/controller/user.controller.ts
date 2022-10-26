import { UserPolicy } from '../policies';
import { ValidationError } from 'sequelize';
import activityLogger from '../config/activity-logger';
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

import {
  AddUserParams,
  UserUpdateParams,
  UserListQueryParams
} from '../types/users.controller';
//import { UserInstance } from '../types';
import {
  add,
  update,
  userDelete,
  userDetail,
  getUserById,
  filterAndPaginate,
} from '../services/user.service';

function list(req: FastifyRequest, reply: FastifyReply) {
  const query = req.query as UserListQueryParams;
  const currentUser = req.currentUser;
  const policy = new UserPolicy(currentUser);
  if (policy.canList()) {
    filterAndPaginate(query, currentUser)
      .then((user) => {
        reply.code(200).send(user);
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

function addUser(req: FastifyRequest, reply: FastifyReply) {
  const params = req.body as AddUserParams;
  const currentUser = req.currentUser;
  const policy = new UserPolicy(currentUser);
  if (policy.canAdd(params)) {
       add(params)
          .then((user) => {
            activityLogger.log(currentUser, user, 'addedUser', 'created');
            reply.code(201).send(user);
          }).catch((error: FastifyError) => {
            reply.send(error);
          });
        
      } else {
        reply
          .code(403)
          .send({ errors: ['You are not allowed to perform this action'] });
      }
}
  
function detail(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  const { currentUser } = req;
  const policy = new UserPolicy(currentUser);
  if (policy.canViewDetail()) {
    userDetail(id, currentUser)
      .then((user) => {
        reply.code(200).send(user);
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

function updateUser(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  const attrs = req.body as UserUpdateParams;
  const { currentUser } = req;
  const policy = new UserPolicy(currentUser);
  getUserById(id)
    .then((user) => {
      if (policy.canUpdate(user)) {
        update(id, currentUser, attrs)
          .then((updatedUser) => {
            activityLogger.log(currentUser, updatedUser, 'updatedUser', 'updated');
            reply.code(200).send(updatedUser);
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
    });
}

function deleteUser(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  const { currentUser } = req;
  const policy = new UserPolicy(currentUser);
  getUserById(id)
    .then(async (user) => {
      //const org = await user.getOrganization();
      if (policy.canDelete(user)) {
        await userDelete(id);
        activityLogger.log(currentUser, user, 'deletedUser', 'deleted');
        reply.send({ message: 'User deleted successfully' });
      } else {
        reply.code(403).send({ errors: ['You are not allowed to perform this action'] });
      }
    })
    .catch((error) => {
      reply.send(error);
    });
}

export {
  addUser,
  list,
  detail,
  updateUser,
  deleteUser
};
