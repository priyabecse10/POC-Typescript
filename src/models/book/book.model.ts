import db from '../../config/database';
//import { USER_ROLE } from '../../config/constants';
import { Sequelize } from 'sequelize';
import { BookStatic} from '../../types';
import { modelOptions, attributes } from './book.model.attributes';

function BookModelFactory(sequelize: Sequelize): BookStatic {
  return sequelize.define('Book', attributes, modelOptions) as BookStatic;
}

const Book = BookModelFactory(db);

export default Book;
