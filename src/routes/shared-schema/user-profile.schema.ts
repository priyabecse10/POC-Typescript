import { USER_ROLE} from '../../config/constants';

export const userProfile = {
  id: { type: 'number' },
  name: { type: 'string' },
  role: {
    type: 'string',
    enum: [Object.values(USER_ROLE)]
  },
  email: { type: 'string' },
  password:{type:'string'}
  
};
