import { headers, adminSecureErrors } from '../shared-schema';

const addUserRouterOpts = {
  schema: {
    headers,
    description: 'add user',
    tags: [
      'users',
      'admin'
    ],
    body: {
      type: 'object',
      required: [
        'name', 'role','email', 'password'
      ],
      properties: {
        name: { type: 'string' },
        role: {
          type: 'string',
          enum: ['user', 'admin']
        },
        email: { type: 'string' },
        password: { type: 'string' },
        book_id:{type:'number'}
      }
    },
    response: {
      headers,
      201: {
        description: 'newly added user',
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          role: {
            type: 'string',
            enum: ['user','admin']
          },
          email: { type: 'string' },
          password: { type: 'string' },
          created_at: { type: 'string' },
          updated_at: { type: 'string' },
          }
        },
        404: {
          description: 'Error occured',
          type: 'object',
          properties: {
            errors: { type: 'array', items: { type: 'string' } }
          }
        },
      ...adminSecureErrors
    }
  }
  };

export default addUserRouterOpts;

