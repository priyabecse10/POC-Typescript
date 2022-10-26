import User from './user/user.model';
import Book from './book/book.model';
import userScopesAndAssociations from './user/user.scopes.associations';

userScopesAndAssociations();


export {
  User,
  Book
};
