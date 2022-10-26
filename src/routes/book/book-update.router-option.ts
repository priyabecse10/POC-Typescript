import { headers, adminSecureErrors } from '../shared-schema';

const updateOrganizationRouterOpts = {
  schema: {
    headers,
    description: 'update organization',
    tags: ['organizations', 'si-admin-role', 'super-admin-role'],
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
        email: { type: 'string' },
        address: { type: 'string' },
        phone_number: { type: 'string' },
        alert_interval_in_minutes: { type: 'number' },
        machine_setting_access: {
          type: 'object',
          properties: {
            params: {
              type: 'array',
              items: { type: 'string' }
            },
            features: {
              type: 'array',
              items: { type: 'string' }
            }
          }
        }
      }
    },
    response: {
      headers,
      200: {
        description: 'organization has been updated',
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          type: {
            type: 'string',
            enum: ['System Integrator', 'Direct Client', 'SI Client']
          },
          email: { type: 'string' },
          address: { type: 'string' },
          country: { type: 'string' },
          created_at: { type: 'string' },
          updated_at: { type: 'string' },
          phone_number: { type: 'string' },
          parent_organization_id: { type: 'number' },
          parent_organization_name: { type: 'string' },
          alert_interval_in_minutes: { type: 'number' },
          machine_setting_access: {
            type: 'object',
            properties: {
              params: {
                type: 'array',
                items: { type: 'string' }
              },
              features: {
                type: 'array',
                items: { type: 'string' }
              }
            }
          }
        }
      },
      404: {
        description: 'no organization found',
        type: 'object',
        properties: {
          errors: { type: 'array', items: { type: 'string' } }
        }
      },
      ...adminSecureErrors
    }
  }
};

export default updateOrganizationRouterOpts;
