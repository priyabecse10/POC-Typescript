import db from '../config/database';
import logger from '../config/logger';
import { Book } from '../models';
import { deleteUsersByBookIds } from './user.service';
import { Op, EmptyResultError, or } from 'sequelize';
import { paginate, paginatorResult } from '../lib/paginator-result';
import { columnSearchQuery, globalSearchQuery } from '../queries/book';

import {
  map,
  size,
  } from 'lodash';
import {
  USER_ROLE,
  Q_MINIMUM_SIZE,
  } from '../config/constants';
import {
  UserInstance,
  BookInstance,
  BookRowsAndCount,
  AddBookParams,
  BookUpdateParams,
  BookListQueryParams,
  BookCreateAttributes
} from '../types';

async function add(attrs: AddBookParams) {
  const bookCreateAttr = {
    ...attrs,
  };
}
function getBookById(id: number) {
  return Book.findByPk(id)
    .then((book: BookInstance | null) => {
      if (book) {
        return book;
      }
      throw new EmptyResultError('Book not found');
    });
}

function getABook(params: any) {
  return Book.findOne({ ...params })
    .then((book: BookInstance | null) => {
      if (!book) {
        throw new EmptyResultError('Organization not found');
      }
      return book;
    });
}

// function getOrgTypeQueryAttr(user: UserInstance) {
//   return {
//     [Op.in]: ORGANIZATION_TYPE_MAP_FOR_LIST[user.role]
//   };
// }

function getCount(attrs: any) {
  return Book.count({
    ...attrs
  });
}

function getAllBook(query: any) {
  return Book.findAll(query);
}

function filterAndPaginate(query: BookListQueryParams, user: UserInstance) {
  const page = query.page && query.page > 0 ? query.page : 1;
  const perPage = query.per_page && query.per_page > 0 ? query.per_page : 10;
  const offset = (page - 1) * perPage;
  const limit = perPage;
  const queries =
    size(query.q) >= Q_MINIMUM_SIZE ? globalSearchQuery(query) : {};
  const columnQuery = columnSearchQuery(query);
  //queries['type'] = getOrgTypeQueryAttr(user); // tslint:disable-line

  // if (user.isadmin()) {
  //   queries['user_id'] = user.id; // tslint:disable-line
  // }

  return Book.findAndCountAll({
    limit,
    offset,
    where: {...columnQuery },
    order: [['name', 'ASC']]
  }).then((book: BookRowsAndCount) => {
    const bookList = map(book.rows, (row: BookInstance) => {
      return ({
        id: row.id,
        name: row.name,
        price:row.price,
        date_of_expiry:row.date_of_expiry,
        created_at: row.created_at,
        updated_at: row.updated_at,
      });
    });
    const rowsAndCounts = { count: book.count, rows: bookList };
    const result = paginate(rowsAndCounts, perPage, page);
    return paginatorResult(result, 'book');
  });
}

function listAllBook(user: UserInstance) {
  const queries = {};
  return Book.findAll({
    where: { ...queries },
    order: [['name', 'ASC']],
    attributes: ['id', 'name','price','date_of_expiry']
  });
}


async function update(id: number, book:BookInstance, attrs: BookUpdateParams) {
  const t = await db.transaction();
  return getBookById(id)
    .then(async(book:any) => {
      await book.update({
        name: attrs.name,
        price:attrs.price,
        date_of_expiry:attrs.date_of_expiry,
        }, { transaction: t }); 
      
        const bookaData = {
        id: book.id,
        name: book.name,
        price:book.price,
        date_of_expiry:book.date_of_expiry,
        created_at: book.created_at,
        updated_at: book.updated_at,
        };
      await t.commit();
      return bookaData;
    })
    .catch(async (error: string | undefined) => {
      await t.rollback();
      throw new Error(error);
    });
}

function bookDetail(id: number) {
  return getABook({
    where: { id }
  }).then(async (book: BookInstance) => {
    const bookResult = {
      id: book.id,
      name: book.name,
      price:book.price,
      date_of_expiry:book.date_of_expiry,
      created_at: book.created_at,
      updated_at: book.updated_at,
      };
    return bookResult;
  });
}

async function bookDelete(id: number) {
  const t = await db.transaction();
  try {
    const book = await getBookById(id);
    let deletedBook;
    deletedBook = await book.destroy({ transaction: t });
    await t.commit();
    
    return book;
  } catch (error) {
    await t.rollback();
    throw error;
  }
}

export {
  add,
  update,
  getCount,
  getABook,
  filterAndPaginate,
  bookDetail,
  bookDelete,
  getAllBook,
  getBookById,
  listAllBook,
};
