import { Injectable } from '@angular/core';

import { Role } from '../../shared/models/profile-response.module';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean = !!this.getToken();
  private storedRole = localStorage.getItem('userRole');
  private userRole: Role = (this.storedRole as Role) ?? 'guest';

  public login(token: string): void {
    localStorage.setItem('token', token);
    this.isAuthenticated = true;
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticated = false;
    this.setUserRole('guest');
  }

  public isLoggedIn(): boolean {
    return this.isAuthenticated && this.userRole !== 'guest';
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public setUserRole(role: Role): void {
    this.userRole = role;
    localStorage.setItem('userRole', role);
  }

  public isAdmin(): boolean {
    return this.userRole === 'manager';
  }
}
