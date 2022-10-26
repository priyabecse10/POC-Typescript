import { UserInstance } from "./user";

export interface UserListQueryParams {
  q?: string;
  page?: number;
  per_page?: number;
}

export interface UserRowsAndCount {
  count: number;
  rows: UserInstance[];
}

export interface AddUserParams {
  name: string;
  role: string;
  email: string;
  password:string;
}

export interface UserUpdateParams {
  name: string;
  role: string;
  email: string;
  password:string;
}
