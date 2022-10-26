export interface LoginBodyParams {
  email: string;
  password: string;
}

export interface LoginServiceParams {
  email: string;
  password: string;
}

export interface JwtTokenUserAttributes {
  id: number;
  email: string;
}

