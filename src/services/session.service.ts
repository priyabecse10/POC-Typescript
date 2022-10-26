import moment from 'moment';
import bcrypt from 'bcrypt';

import { getUserByEmail } from './user.service';
import { sign as jwtSignin, verify as jwtVerify } from 'jsonwebtoken';

import {
  SessionError,
  UserPasswordExpiredError
} from '../exceptions';
import {
  UserInstance,
  LoginServiceParams
} from '../types';

function validatePassword(currentUser: UserInstance, password: string) {
  // if (moment().utc().isAfter(currentUser.password_expiry)) {
  //   throw new UserPasswordExpiredError('Your password is expired. Kindly reset it.');
  // }
  const isPasswordSame = bcrypt.compareSync(
    password,
    currentUser.password
  );

  if (!isPasswordSame) {
    throw new SessionError('Invalid username or password');
  }
}

async function markSignin(user: UserInstance, attrs: LoginServiceParams) {
  const currentDate = new Date();
  const { id, email } = user;
  const { JWT_SECRET_KEY } = process.env;
  const token = jwtSignin(
    { id, email },
    JWT_SECRET_KEY
  );
  const updateAttributes = {
    access_token: token,
    current_sign_in_at: currentDate,
  };
  await user.update(updateAttributes);
  return await profile(user);
}

async function profile(user: UserInstance) {
  const book = await user.getBook();
  return {
    ...user.get(),
    book_name: book.name,
    book_type: book.type
  };
}

async function signin(attrs: LoginServiceParams) {
  let currentUser: UserInstance;
  try {
    currentUser = await getUserByEmail(attrs.email);
  } catch (error) {
    throw new SessionError('Invalid username or password');
  }
  validatePassword(currentUser, attrs.password);
  return await markSignin(currentUser, attrs);
}

function markAsLoggedOut(user: UserInstance) {
  return user.update({ access_token: null });
}

function markLogout(user: UserInstance) {
  return markAsLoggedOut(user);
}

function decryptUserAttrsFromInvitationToken(
  invitationToken: string,
  type: string
) {
  const token = invitationToken.split(' ')[1];
  if (!token) {
    throw new SessionError('No access token found');
  }
  const { JWT_SECRET_KEY = '' } = process.env;
  const userAttrs = jwtVerify(token, JWT_SECRET_KEY);
  if (!userAttrs || type !== userAttrs.type) {
    throw new SessionError('Invalid access token');
  }
  return userAttrs;
}

function validatePasswordDuringSession(currentUser: UserInstance, password: string) {
  const isPasswordSame = bcrypt.compareSync(
    password,
    currentUser.password
  );

  if (!isPasswordSame) {
    throw new SessionError('Invalid current password');
  }
}

function validateChangePassword(currentUser: UserInstance, password: string) {
  const isPasswordSame = bcrypt.compareSync(
    password,
    currentUser.password
  );

  if (!isPasswordSame) {
    throw new Error('Invalid current password');
  }
}

export {
  signin,
  markLogout,
  validateChangePassword,
  validatePasswordDuringSession,
  decryptUserAttrsFromInvitationToken
};
