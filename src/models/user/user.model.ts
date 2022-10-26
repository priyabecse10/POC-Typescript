import db from '../../config/database';
import { USER_ROLE } from '../../config/constants';
import { Sequelize } from 'sequelize';
import { UserStatic } from '../../types';
import { modelOptions, attributes } from './user.model.attributes';

function UserModelFactory(sequelize: Sequelize): UserStatic {
  return sequelize.define('User', attributes, modelOptions) as UserStatic;
}

const User = UserModelFactory(db);

User.prototype.admin = function (): boolean {
  return this.role === USER_ROLE.admin;
};

User.prototype.user = function (): boolean {
  return this.role === USER_ROLE.user;
};

export default User;
