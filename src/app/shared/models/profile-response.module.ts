export interface ILogoutResponse {}

export type Role = 'guest' | 'user' | 'manager';

export interface IProfileResponse {
  name: string | null;
  email: string;
  role: Role;
}

export interface IUser extends IProfileResponse {}
