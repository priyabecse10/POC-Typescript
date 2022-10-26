import bcrypt from 'bcrypt';
import moment from 'moment';

import { DataTypes } from 'sequelize';
import { UserInstance } from '../../types';
import { USER_ROLE } from '../../config/constants';

import {
  isEmailUnique,
  // isValidPassword
} from './user.model.validators';

// const passwordExpiryDuration = process.env.PASSWORD_EXPIRY_IN_MONTHS || 3;

export const modelOptions = {
  tableName: 'user',
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  //deletedAt: 'deleted_at',
  paranoid: true,
  indexes: [
    { fields: ['role'] },
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
  role: {
    type: DataTypes.ENUM(...Object.values(USER_ROLE)),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Role can\'t be empty',
        args: true
      }
    }
  },
  email: {
    type: new DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmailUnique,
      isEmail: {
        msg: 'Invalid email',
        args: true
      },
      len: {
        msg: 'Email length should be 1 to 100 characters',
        args: [1, 100] as readonly [number, number]
      },
      notNull: {
        msg: 'Email can\'t be empty',
        args: true
      }
    }
  },
  // encrypted_password: {
  //   type: DataTypes.TEXT,
  //   allowNull: false,
  //   validate: {
  //     notNull: {
  //       msg: 'Encrypted Password can\'t be empty',
  //       args: true
  //     },
  //     notEmpty: {
  //       msg: 'Encrypted Password can\'t be blank',
  //       args: true
  //     }
  //   }
  // },
  
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      // isValidPassword,
      len: {
        msg: 'Password length should be 6 to 20 characters',
        args: [6, 20] as readonly [number, number]
      },
      notNull: {
        msg: 'Password can\'t be empty',
        args: true
      }
    },
    set(this: UserInstance, val: string) {
      if (!!val) {
        this.setDataValue('password', val);
        // this.setDataValue(
        //   'encrypted_password',
        //   bcrypt.hashSync(val, SALT_ROUND)
        // );
        // this.setDataValue('password_expiry', moment(
        //   moment().add(passwordExpiryDuration, 'M').format('YYYY-MM-DD HH:mm:ss')).toDate()
        // );
      }
    }
  },
  // password_confirmation: {
  //   type: DataTypes.VIRTUAL
  // },
  access_token: {
    type: DataTypes.TEXT
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
  // deleted_at: {
  //   type: DataTypes.DATE
  // }
};
