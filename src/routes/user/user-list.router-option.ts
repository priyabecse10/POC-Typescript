import { pagination, headers, adminSecureErrors } from '../shared-schema';

const listUserRouterOpts = {
  schema: {
    headers,
    description: 'get the list of users',
    tags: [
      'users',
      'admin'
    ],
    querystring: {
      type: 'object',
      required: ['id'],
      properties: {
        q: { type: 'string' },
        page: { type: 'number' },
        per_page: { type: 'number' },
        user_id:{type:'number'}
        }
    },
    response: {
      headers,
      200: {
        description: 'List of users',
        type: 'object',
        properties: {
          pagination,
          users: {
            type: 'array',
            items: {
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
          }
        }
      },
      ...adminSecureErrors
    }
  }
};

export default listUserRouterOpts;