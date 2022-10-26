import logger from '../config/logger';

const type = 'ActivityLog';

function getUserLogFormat(user: any) {
  return {
    id: user.id,
    name: user.name,
    role: user.role
  };
}

function getResourceFormat(resource: any) {
  return {
    id: resource.id,
    name: resource.name,
    organizationId: resource.parent_organization_id ?
      resource.parent_organization_id : resource.organization_id
  };
}

function activityMessageFormat(
  user: any,
  resource: any,
  resourceName: string,
  action: string
): string {
  return `${user.name} ${action} ${resourceName} ${resource.name} successfully`;
}

function log(user: any, resource: any, resourceName: string, action: string) {
  const resourceObj = getResourceFormat(resource);
  const activityMessage = activityMessageFormat(
    user,
    resource,
    resourceName,
    action
  );
  logger.info(
    { type, user: getUserLogFormat(user), [resourceName]: resourceObj },
    activityMessage
  );
}

const activityLogger = {
  log
};

export default activityLogger;
