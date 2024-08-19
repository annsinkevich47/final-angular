import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const isLoggedIn = this.authService.isLoggedIn();

    switch (state.url) {
      case '/signin':
        return isLoggedIn ? this.router.createUrlTree(['/']) : true;
      case '/signup':
        return isLoggedIn ? this.router.createUrlTree(['/']) : true;
      default:
        return isLoggedIn ? true : this.router.createUrlTree(['/']);
    }
  }
}
