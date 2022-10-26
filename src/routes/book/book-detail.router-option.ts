import { headers, adminSecureErrors } from '../shared-schema';

const bookDetailRouterOpts = {
  schema: {
    headers,
    description: 'get the book detail',
    tags: [
      'book',
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
        description: 'book detail',
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          price:{type:'number'},
          date_of_expiry:{type:'date'},
          created_at: { type: 'string' },
          updated_at: { type: 'string' },
          user_id: { type: ['number', 'null'] },
          }
      },
      404: {
        description: 'no book found',
        type: 'object',
        properties: {
          errors: { type: 'array', items: { type: 'string' } }
        }
      },
      ...adminSecureErrors
    }
  }
};

export default bookDetailRouterOpts;
