import Sequelize from 'sequelize';
import { BookListQueryParams } from '../../types';

const { Op } = Sequelize;

const globalSearchQuery = (query: BookListQueryParams) => {
  const text = query.q;
  const searchQueries: any = [];
  searchQueries.push({
    name: { [Op.iLike]: `%${text}%` }
  });
  searchQueries.push(
    Sequelize.where(
      Sequelize.cast(Sequelize.col('Organization.type'), 'varchar'),
      {
        [Op.iLike]: `%${text}%`
      }
    )
  );
  
  const result = {
    [Op.or]: searchQueries
  };
  return result;
};

export default globalSearchQuery;
