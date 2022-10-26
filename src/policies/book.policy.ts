import { UserInstance, BookInstance, BookUpdateParams, AddBookParams } from '../types';
//import { isEmpty, difference, includes } from 'lodash';

export default class BookPolicy {
  constructor(private currentUser: UserInstance) { }

  private canadminAdd(bookCreateAttr:AddBookParams) {
     return (this.currentUser.isadmin());
  }
  private canadminViewDetail(book:any) {
    return this.currentUser.isadmin() &&
      (book.id === this.currentUser.id ||
        book.user_id === this.currentUser.id);
  }
  
  private canadminUpdate(id:number,bookUpdateAttr:BookUpdateParams) {
    return (this.currentUser.isadmin());
  }

  private canadminDelete(book:any) {
    return this.currentUser.isadmin() &&
      this.currentUser.id !== book.id;
  }

  canList() {
    return this.currentUser.isadmin();
  }

  canListAll() {
    return this.currentUser.isadmin();
  }

  canAdd(bookCreateAttr:AddBookParams) {
    return this.canadminAdd(bookCreateAttr);
  }

  canUpdate(id:number, bookUpdateAttr:BookUpdateParams) {
    return this.canadminUpdate(id, bookUpdateAttr);
  }

  canViewDetail(book: BookInstance) {
    return this.currentUser.isadmin()||
    this.canadminViewDetail(book);
  }

  canDelete(book:any) {
    return this.canadminDelete(book);
  }
}
