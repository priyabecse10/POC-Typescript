import { headers, adminSecureErrors } from '../shared-schema';

const listAllBookRouterOpts = {
  schema: {
    headers,
    description: 'get the list of all book',
    tags: ['book', 'admin'],
    response: {
      headers,
      200: {
        description: 'List of all book',
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' },
            price:{type:'number'},
            date_of_expiry:{type:'date'},
            user_id: { type: ['number', 'null'] },
          }
        }
      }
    },
    ...adminSecureErrors
  }
};

export default listAllBookRouterOpts;
