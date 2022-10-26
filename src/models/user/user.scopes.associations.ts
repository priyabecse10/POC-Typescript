import User from './user.model';
//import Organization from '../organization/organization.model';
//import MachineConfigLog from '../machine-config-log/machine-config-log.model';

import { USER_ROLE } from '../../config/constants';

function defineScopeAndAssociation() {
  //User.hasMany(book);

  // User belongs to an organization
  //User.belongsTo(Organization, { as: 'organization' });

  User.addScope('admin', {
    where: {
      role: USER_ROLE.admin
    }
  });

  
  User.addScope('user', {
    where: {
      role: USER_ROLE.user
    }
  });
}

export default defineScopeAndAssociation;
