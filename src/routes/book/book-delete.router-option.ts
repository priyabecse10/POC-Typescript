import { headers, adminSecureErrors } from '../shared-schema';

const deleteBookRouterOpts = {
  schema: {
    headers,
    description: 'delete book',
    tags: ['book', 'admin'],
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
        description: 'book deleted',
        type: 'object',
        properties: {
          message: { type: 'string' }
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

export default deleteBookRouterOpts;
