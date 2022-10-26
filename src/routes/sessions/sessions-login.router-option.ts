import { headers, signInUserProfile } from '../shared-schema';

const loginRouterOpts = {
  schema: {
    description: 'post user credentials',
    tags: [
      'sessions',
      'admin',
      'user'
      ],
    body: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: { type: 'string' },
        password: { type: 'string' }
      }
    },
    response: {
      headers,
      200: {
        description: 'Successfully logged in',
        type: 'object',
        properties: signInUserProfile
      },
      401: {
        description: 'Invalid username or password',
        type: 'object',
        properties: {
          errors: { type: 'array', items: { type: 'string' } }
        }
      },
      403: {
        description: 'Password is expired',
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
export default loginRouterOpts;
