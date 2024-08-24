import { Injectable } from '@angular/core';

import {
  IProfileResponse,
  Role,
} from '../../shared/models/profile-response.module';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean = !!this.getToken();
  private storedRole = this.getUserData()?.role;
  private userRole: Role = (this.storedRole as Role) ?? 'guest';

  public login(token: string): void {
    localStorage.setItem('token', token);
    this.isAuthenticated = true;
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticated = false;
    localStorage.removeItem('userData');
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public setUserData(data: IProfileResponse) {
    this.userRole = data.role;
    localStorage.setItem('userData', JSON.stringify(data));
  }

  public getUserData(): IProfileResponse | null {
    const userData = localStorage.getItem('userData');

    return userData ? JSON.parse(userData) : null;
  }

  public isLoggedIn(): boolean {
    return this.isAuthenticated && this.userRole !== 'guest';
  }

  public isAdmin(): boolean {
    return this.userRole === 'manager';
  }
}
