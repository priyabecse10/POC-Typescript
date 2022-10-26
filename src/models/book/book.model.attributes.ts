
import moment from 'moment';

import { DataTypes } from 'sequelize';
import { UserInstance } from '../../types';
import { USER_ROLE } from '../../config/constants';


export const modelOptions = {
  tableName: 'book',
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  //deletedAt: 'deleted_at',
  paranoid: true,
  indexes: [
    { fields: ['user_id'] },
    ]
};

export const attributes = {
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      len: {
        msg: 'Name length should be 3 to 50 characters',
        args: [3, 50] as readonly [number, number]
      },
      notNull: {
        msg: 'Name can\'t be empty',
        args: true
      }
    }
  },
  price: {
    type: DataTypes.NUMBER,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Price can\'t be empty',
        args: true
      }
    }
  },
  date_of_expiry: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Date_of_Expiry can\'t be empty',
        args: true
      }
    }
  },
  user_id:{
    type:DataTypes.BIGINT
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Created at can\'t be empty',
        args: true
      }
    }
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Updated at can\'t be empty',
        args: true
      }
    }
  },
};
