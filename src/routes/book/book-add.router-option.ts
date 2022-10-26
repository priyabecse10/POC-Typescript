import { headers, adminSecureErrors } from '../shared-schema';

const addBookRouterOpts = {
  schema: {
    headers,
    description: 'add book',
    tags: ['book', 'admin'],
    body: {
      type: 'object',
      required: [
        'name', 'price','date_of_expiry'
      ],
      properties: {
        name: { type: 'string' },
        price:{type:'number'},
        date_of_expiry:{type:'date'},
        user_id: { type: ['number', 'null'] },
      
      }
    },
    response: {
      headers,
      201: {
        description: 'newly added book',
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          price:{type:'number'},
          date_of_expiry:{type:'date'},
          user_id: { type: ['number', 'null'] },
          created_at: { type: 'string' },
          updated_at: { type: 'string' },
          
        }
      },
      ...adminSecureErrors
    }
  }
};

export default addBookRouterOpts;
