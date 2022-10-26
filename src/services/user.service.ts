import db from '../config/database';
//import { PubClient } from '../config/redis-client';
//import { sendInvitation } from './mailer.service';
import {globalSearchQueries} from '../queries/user';
//import { getOrganizationById } from './organization.service';
//import { generateRandomPassword } from '../lib/generate-password';
//import { deleteNotificationsByUserId } from './notification.service';

import { map, size } from 'lodash';
import { User,Book} from '../models';
import { Op, EmptyResultError, or } from 'sequelize';
import { paginate, paginatorResult } from '../lib/paginator-result';

import {
  USER_ROLE,
  Q_MINIMUM_SIZE
} from '../config/constants';
import {
  UserInstance,
  AddUserParams,
  UserUpdateParams,
  UserListQueryParams,
  UserRowsAndCount
} from '../types';

import { getBookById } from './book.service';

const USER_ROLE_MAP = {
  'admin': [USER_ROLE.admin],
  'user': [USER_ROLE.user]
};

function getUserById(id: number) {
  return User.findByPk(id)
    .then((user: UserInstance | null) => {
      if (!user) {
        throw Error('User not found');
      }
      return user;
    });
}

function getUserByEmail(email: string): Promise<UserInstance> {
  return User.findOne({
    where: { email: { [Op.iLike]: email } }
  }).then((user: UserInstance | null) => {
    if (user) {
      return user;
    }
    throw new EmptyResultError('User not found');
  });
}

function getAUser(params: any) {
  return User.findOne({ ...params })
    .then((user: UserInstance | null) => {
      if (!user) {
        throw Error('User not found');
      }
      return user;
    });
}

async function userDetail(id: number, user: UserInstance) {
  //const userQuery = {};
  const userResult = await getAUser({ where: { id } });
  
  const userData = {
    id: userResult.id,
    name: userResult.name,
    role: userResult.role,
    email: userResult.email,
   
    created_at: userResult.created_at,
    updated_at: userResult.updated_at,
    
  };

  if (user.isadmin()) {
    return userData;
  }
  if (user.isuser()) {
          return userData;
    }else{
    throw Error('User not found');
  }
} 


async function filterAndPaginate(query: UserListQueryParams, user: UserInstance) {
  const page = query.page && query.page > 0 ? query.page : 1;
  const perPage = query.per_page && query.per_page > 0 ? query.per_page : 10;
  const offset = (page - 1) * perPage;
  const limit = perPage;
  const queries =
    size(query.q) >= Q_MINIMUM_SIZE ? globalSearchQueries(query) : {};
 // queries['role'] = getUserRoleQueryAttr(user); // tslint:disable-line
  //queries['organization_id'] = await getUserOrganizationQueryAttr(user, query);//tslint:disable-line

  return User.findAndCountAll({
    limit,
    offset,
    where: { ...queries },
    order: [['name', 'ASC']],
    attributes: [
      'id', 'name', 'role', 'email'
    ],
    include: {
      as: 'Book',
      model: Book,
      attributes: ['id', 'name', 'price','date_of_expiry']
    }
  })
    .then((users: UserRowsAndCount) => {
      const usersList = map(users.rows, (row: UserInstance) => ({
        id: row.id,
        name: row.name,
        role: row.role,
        email: row.email,
        created_at: row.created_at,
        updated_at: row.updated_at,
        }));
      const rowsAndCounts = { count: users.count, rows: usersList };
      const result = paginate(rowsAndCounts, perPage, page);
      return paginatorResult(result, 'users');
    });
}

async function getUserBook(user:any) {
  return await user.getBook();
}

async function getUserBookQueryAttr(user: UserInstance, query:any) {
  if (user.isadmin()) {
    return {
      [Op.eq]: query.book_id
    };
  } if (user.isadmin()) {
    const book = await getBookById(query.book_id);
    if (book.user_id === user.id) {
      return {
        [Op.eq]: book.id
      };
    }
    throw Error('Book not found');
  }
}

async function add(attrs: AddUserParams) {
  const userCreateAttr = {
    ...attrs,
  };

  const newUser = await User.create(userCreateAttr);
  const userData = {
    id: newUser.id,
    name: newUser.name,
    role: newUser.role,
    email: newUser.email,
    password:newUser.password,
    created_at: newUser.created_at,
    updated_at: newUser.updated_at,
  };
  return userData;
}
function update(id: number, currentUser: UserInstance, attrs: UserUpdateParams) {
  return getUserById(id)
    .then(async (user) => {
      await user.update({
        name: attrs.name,
        role:attrs.role,
        email:attrs.email,
        password:attrs.password,
      });

      const userData = {
        id: user.id,
        name: user.name,
        role: user.role,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at
      };
      return userData;
    });
}
async function deleteUsersByBookIds(id: number, transaction: object) {
  const deletedUser = await User.destroy({
    where: { id: id }, ...transaction
  });
  return deletedUser;
}

async function userDelete(id: number) {
  const t = await db.transaction();
  try {
    const user = await getUserById(id);
    const deletedUser = await user.destroy({ transaction: t });
    await t.commit();

    return deletedUser;
  } catch (error) {
    await t.rollback();
    throw error;
  }
}
export {
  add,
  update,
  userDelete,
  filterAndPaginate,
  deleteUsersByBookIds,
  getUserBookQueryAttr,
  getUserById,
  getUserByEmail,
  getAUser,
  getUserBook,
  userDetail,

};
  


