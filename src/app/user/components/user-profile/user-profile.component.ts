import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { IProfile } from '../../../shared/models/profile-response.module';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  public currentUser!: IProfile;
  public isEditingName = false;
  public isEditingEmail = false;
  public editNameInput = new FormControl<string | null>('');
  public editEmailInput = new FormControl<string | null>('');

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.profileService.getUserInfo().subscribe(user => {
      this.currentUser = user;
      this.editNameInput.setValue(this.currentUser.name ?? 'User');
      this.editEmailInput.setValue(this.currentUser.email);
    });
  }

  public toggleEditName(): void {
    this.isEditingName = !this.isEditingName;
  }

  public toggleEditEmail(): void {
    this.isEditingEmail = !this.isEditingEmail;
  }

  public saveName(): void {
    const name = this.editNameInput.value?.trim();
    const { email } = this.currentUser;

    if (!name || !email) return;

    this.profileService.updateUserInfo(name, email).subscribe(() => {
      this.currentUser.name = name;
      this.isEditingName = false;
    });
  }

  public saveEmail(): void {
    const { name } = this.currentUser;
    const email = this.editEmailInput.value?.trim();

    if (!name || !email) return;

    this.profileService.updateUserInfo(name, email).subscribe(() => {
      this.currentUser.email = email;
      this.isEditingEmail = false;
    });
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
