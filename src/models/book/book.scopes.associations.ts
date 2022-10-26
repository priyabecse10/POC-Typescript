import User from './book.model';
import Book from '../book/book.model';
//import MachineConfigLog from '../machine-config-log/machine-config-log.model';

import { USER_ROLE } from '../../config/constants';

function defineScopeAndAssociation() {
  Book.belongsTo(User);

}

export default defineScopeAndAssociation;
