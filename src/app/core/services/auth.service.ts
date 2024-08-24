import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
  private loggedInSubject = new BehaviorSubject<boolean>(this.isAuthenticated);
  private userDataSubject = new BehaviorSubject<IProfileResponse | null>(
    this.getUserData()
  );
  public loggedIn$ = this.loggedInSubject.asObservable();
  public userData$ = this.userDataSubject.asObservable();

  public login(token: string): void {
    localStorage.setItem('token', token);
    this.isAuthenticated = true;
    this.loggedInSubject.next(true);
  }

  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    this.userRole = 'guest';
    this.isAuthenticated = false;
    this.loggedInSubject.next(false);
    this.userDataSubject.next(null);
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public setUserData(data: IProfileResponse) {
    this.userRole = data.role;
    localStorage.setItem('userData', JSON.stringify(data));
    this.userDataSubject.next(data);
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
