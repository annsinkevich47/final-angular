import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(): boolean | UrlTree {
    const token = localStorage.getItem('token');

    if (token) {
      this.router.createUrlTree(['/']);

      return false;
    }
    return true;
  }
}
