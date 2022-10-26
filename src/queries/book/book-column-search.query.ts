import Sequelize from 'sequelize';
import { BookListQueryParams } from '../../types';

const { Op } = Sequelize;

const columnSearchQuery = (query: BookListQueryParams) => {
  const {
    name
  } = query;
  const searchQueries: any[] = [];

  if (name) {
    const nameQuery = { name: { [Op.iLike]: `%${name}%` } };
    searchQueries.push(nameQuery);
  }
  
  const result = {
    [Op.and]: [searchQueries]
  };
  return result;
};
export default columnSearchQuery;
