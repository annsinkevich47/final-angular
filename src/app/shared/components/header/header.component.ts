import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  public isLoggedIn$!: Observable<boolean>;
  public isAdmin$!: Observable<boolean>;
  public userName: string = '';

  constructor(private authService: AuthService) {}

  public ngOnInit(): void {
    this.isLoggedIn$ = this.authService.loggedIn$;
    this.isAdmin$ = this.authService.userData$.pipe(
      map(userData => (userData ? userData.role === 'manager' : false))
    );

    this.authService.userData$.subscribe(userData => {
      if (userData) {
        this.userName = `Welcome, ${userData.name || 'User'}`;
      } else {
        this.userName = '';
      }
    });
  }
}
