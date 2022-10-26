import { headers, adminSecureErrors } from '../shared-schema';

const userDetailRouterOpts = {
  schema: {
    headers,
    description: 'get the user detail',
    tags: [
      'users',
      'admin'
    ],
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'number' }
      }
    },
    response: {
      headers,
      200: {
        description: 'user detail',
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          role: {
            type: 'string',
            enum: ['user','admin']
          },
          email: { type: 'string' },
          password: { type: 'text' },
          created_at: { type: 'string' },
          updated_at: { type: 'string' },
          }
        }
      },
      404: {
        description: 'no user found',
        type: 'object',
        properties: {
          errors: { type: 'array', items: { type: 'string' } }
        }
      },
      ...adminSecureErrors
    }
  };

export default userDetailRouterOpts;