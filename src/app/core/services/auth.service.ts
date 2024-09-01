import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import {
  IProfileResponse,
  Role,
} from '../../shared/models/profile-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private storedRole = this.getUserData()?.role;
  private userRole: Role = (this.storedRole as Role) ?? 'guest';
  public loggedIn$ = new BehaviorSubject<boolean>(this.isLoggedIn());
  public userData$ = new BehaviorSubject<IProfileResponse | null>(
    this.getUserData(),
  );

  public login(token: string): void {
    localStorage.setItem('token', token);
    this.loggedIn$.next(true);
  }

  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    this.userRole = 'guest';
    this.loggedIn$.next(false);
    this.userData$.next(null);
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public setUserData(data: IProfileResponse) {
    this.userRole = data.role;
    localStorage.setItem('userData', JSON.stringify(data));
    this.userData$.next(data);
  }

  public getUserData(): IProfileResponse | null {
    const userData = localStorage.getItem('userData');

    return userData ? JSON.parse(userData) : null;
  }

  public isLoggedIn(): boolean {
    return this.getToken() !== null && this.userRole !== 'guest';
  }

  public isAdmin(): boolean {
    return this.userRole === 'manager';
  }
}
