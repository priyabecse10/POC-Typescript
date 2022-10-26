import Sequelize from 'sequelize';
import { UserListQueryParams } from '../../types';

const { Op } = Sequelize;

const globalSearchQuery = (query: UserListQueryParams) => {
  const text = query.q;
  const searchQueries: any = [];
  searchQueries.push({
    name: { [Op.iLike]: `%${text}%` }
  });
  searchQueries.push(
    Sequelize.where(
      Sequelize.cast(Sequelize.col('User.role'), 'varchar'),
      {
        [Op.iLike]: `%${text}%`
      }
    )
  );
  searchQueries.push({
    email: { [Op.iLike]: `%${text}%` }
  });
  searchQueries.push({
    phone_number: { [Op.iLike]: `%${text}%` }
  });
  const result = {
    [Op.or]: searchQueries
  };
  return result;
};

export default globalSearchQuery;
