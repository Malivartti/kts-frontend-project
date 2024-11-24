export type UserApi = {
  id: number;
  email: string;
  password: string;
  name: string;
  role: Role;
  avatar: string;
}

export type UserModel = {
  id: number;
  email: string;
  name: string;
  role: Role;
  avatar: string;
}

export const normalizationUser = (row: UserApi): UserModel => ({
  id: row.id,
  email: row.email,
  name: row.name,
  role: row.role,
  avatar: row.avatar,
});

export type UserLoginReqApi = {
  email: string;
  password: string;
}

export type UserLoginResApi = {
  access_token: string;
  refresh_token: string;
}

export type UserCreateReqApi = {
  name: string;
  email: string;
  password: string;
  avatar: string;
}

export type UserUpdateReqApi = {
  email: string;
  name: string;
}

export type UserCheckEmailReqApi = {
  email: string;
}

export type UserCheckEmailResApi = {
  isAvailable: boolean;
}

export enum Role {
  admin = 'admin',
  customer = 'customer',
  guest = 'guest'
}