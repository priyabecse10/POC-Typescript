export interface LoginBodyParams {
  username: string;
  password: string;
}

export interface LoginServiceParams {
  username: string;
  password: string;
  ipaddress: string;
}

export interface JwtTokenUserAttributes {
  id: number;
  email: string;
}

export interface JwtTokenEtlAttributes {
  name: string;
}
