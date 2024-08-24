import { Component } from '@angular/core';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private authService: AuthService) {}

  public get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  public get isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
