import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean = !!this.getToken();

  public login(token: string): void {
    localStorage.setItem('token', token);
    this.isAuthenticated = true;
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticated = false;
  }

  public isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }
}
