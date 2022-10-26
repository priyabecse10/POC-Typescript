//import {AddUserParams} from './users.controller';
import {
  Model,
  BuildOptions,
  BelongsToGetAssociationMixin
} from 'sequelize';

export interface UserAttributes {
  id: number;
  name: string;
  role: string;
  email: string;
  password?: string;
  created_at: Date;
  updated_at: Date;
  access_token?: string | null;
  }

export type UserCreateAttributes = Pick<
  UserAttributes,
  'name' | 'role' | 'email' | 'password' 
>;

export interface UserInstance
  extends Model<UserAttributes, UserCreateAttributes>,
  UserAttributes {
  
  isadmin(): boolean;
  isuser(): boolean;
  getBook: BelongsToGetAssociationMixin<BookInstance>;
}

export type UserStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): UserInstance;
};
