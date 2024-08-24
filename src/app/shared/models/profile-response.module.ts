export interface ILogoutResponse {}

export interface IProfileResponse {
  name: string | null;
  email: string;
  role: 'guest' | 'user' | 'manager';
}
