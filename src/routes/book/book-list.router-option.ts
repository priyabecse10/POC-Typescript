import { pagination, headers, adminSecureErrors } from '../shared-schema';

const listBookRouterOpts = {
  schema: {
    headers,
    description: 'get the list of book',
    tags: ['book', 'admin'],
    querystring: {
      type: 'object',
      properties: {
        q: { type: 'string' },
        name: { type: 'string' },
        price:{type:'number'},
        date_of_expiry:{type:'date'},
        page: { type: 'number' },
        per_page: { type: 'number' },
      }
    },
    response: {
      headers,
      200: {
        description: 'List of book',
        type: 'object',
        properties: {
          pagination,
          book: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                name: { type: 'string' },
                price:{type:'number'},
                date_of_expiry:{type:'date'},
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

export default listBookRouterOpts;
