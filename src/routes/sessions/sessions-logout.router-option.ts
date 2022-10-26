import { headers } from '../shared-schema';

const logoutRouterOpts = {
  schema: {
    headers,
    description: 'delete user sessions',
    tags: [
      'sessions',
      'admin',
      'user'
    ],
    response: {
      200: {
        description: 'Successfully logged out',
        type: 'object',
        properties: {
          message: { type: 'string' }
        }
      },
      401: {
        description: 'Invalid session',
        type: 'object',
        properties: {
          errors: { type: 'array', items: { type: 'string' } }
        }
      },
      500: {
        description: 'Something went wrong',
        type: 'object',
        properties: {
          errors: { type: 'array', items: { type: 'string' } }
        }
      }
    }
  }
};
export default logoutRouterOpts;
