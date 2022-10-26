import { headers, adminSecureErrors } from '../shared-schema';

const updateUserRouterOpts = {
  schema: {
    headers,
    description: 'update user',
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
    body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          role: {
            type: 'string',
            enum: ['user','admin']
          },
          email: { type: 'string' },
          password: { type: 'text' }        
        }
    },
    response: {
      headers,
      200: {
        description: 'user has been updated',
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
  }
};

export default updateUserRouterOpts;