import { LoginBodyParams } from '../types';
import { FastifyRequest, FastifyReply } from 'fastify';

import {
  signin,
  markLogout
} from '../services/session.service';

function login(request: FastifyRequest, reply: FastifyReply) {
  const { email, password } = request.body as LoginBodyParams;
  signin({ email, password})
    .then((user) => {
      reply.header('Authorization', `Bearer ${user.access_token}`);
      reply.code(200).send(user);
    })
    .catch((error) => {
      if (error)
        {
        reply.send(error);
      } else {
        reply.send(error);
      }
    });
}

function logout(request: FastifyRequest, reply: FastifyReply) {
  markLogout(request.currentUser)
    .then(() => {
      reply.header('Authorization', null);
      reply.code(200).send({ message: 'Successfully logged out' });
    })
    .catch((error) => {
      reply.send(error);
    });
}

export {
  login,
  logout
};
