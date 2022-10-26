import { BookInstance } from "./book";

export interface BookListQueryParams {
  q?: string;
  page?: number;
  per_page?: number;
  name?: string;
  price?:number,
  date_of_expiry?:Date
}

export interface BookRowsAndCount {
  count: number;
  rows: BookInstance[];
}

export interface AddBookParams {
  name: string;
  price:number;
  date_of_expiry:Date;
  user_id?: number;
}

export interface BookUpdateParams {
  name: string;
  price:number;
  date_of_expiry:Date;
}

