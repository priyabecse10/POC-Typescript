import { UserInstance } from './user';
import {
  Model,
  BuildOptions,
  HasManyGetAssociationsMixin
} from 'sequelize';

export interface BookAttributes {
  id: number;
  name: string;
  price:number;
  date_of_expiry:Date;
  created_at: Date;
  updated_at: Date;
  user_id?: number | null;
}

export type BookCreateAttributes = Pick<
  BookAttributes,
  'name' | 'price' |'date_of_expiry'| 'user_id' 
  >;

export interface BookInstance
  extends Model<BookAttributes, BookCreateAttributes>,
  BookAttributes {
  id: any;
  name: string;
  price:number;
  date_of_expiry:Date;
  isadmin(): boolean;
  getUsers: HasManyGetAssociationsMixin<UserInstance>;
}

export type BookStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): BookInstance;
};
