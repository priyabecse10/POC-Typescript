import { USER_ROLE } from '../config/constants';
import { UserInstance, AddUserParams } from '../types';

export default class UserPolicy {
  constructor(private currentUser: UserInstance) { }

  private canadminAdd( userAddParams: AddUserParams) {
    return (userAddParams.role === USER_ROLE.admin);
  }
  private canuserAdd( userAddParams: AddUserParams) {
    return (userAddParams.role === USER_ROLE.user);
  }
  canAdd(userAddParams: AddUserParams) {
    return ((this.currentUser.isadmin() &&
      this.canadminAdd(userAddParams)) ||
      (this.currentUser.isuser() &&
        this.canuserAdd(userAddParams)));
  }
  private canadminUpdate(user: UserInstance) {
    return this.currentUser.isadmin() &&
      (user.id !== this.currentUser.id);
  }
  private canuserUpdate(user: UserInstance) {
    return this.currentUser.isuser() &&
      (user.id !== this.currentUser.id);
  }
  private canadminDelete(user: UserInstance) {
    return this.currentUser.isadmin() &&
      (user.id !== this.currentUser.id);
  }
  private canuserDelete(user: UserInstance) {
    return this.currentUser.isuser() &&
      (user.id !== this.currentUser.id);
  }
  canList() {
    return this.currentUser.isadmin() ||
      this.currentUser.isuser();
  }
  canViewDetail() {
    return this.currentUser.isadmin() ||
      this.currentUser.isuser();
  }
  canUpdate(user: UserInstance) {
    return this.canadminUpdate(user) ||
      this.canuserUpdate(user);
}
canDelete(user: UserInstance) {
  return this.canadminDelete(user) ||
    this.canuserDelete(user);
}
}
