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
  public isEditingName: boolean = false;
  public isEditingEmail: boolean = false;
  public editNameInput = new FormControl<string | null>('');
  public editEmailInput = new FormControl<string | null>('');
  public emailError: string = '';
  private isSubmitted: boolean = false;
  private regExpEmail: RegExp = /^[\w\d_]+@[\w\d_]+\.\w{2,7}$/;

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

      this.editEmailInput.valueChanges.subscribe(value => {
        this.validateEmail(value);
      });
    });
  }

  public toggleEditName(): void {
    this.isEditingName = !this.isEditingName;
  }

  public toggleEditEmail(): void {
    this.isEditingEmail = !this.isEditingEmail;
    this.emailError = '';
  }

  public saveName(): void {
    const name = this.editNameInput.value?.trim();
    const { email } = this.currentUser;

    if (!name || !email) return;

    // if (!this.isNameValid(name)) return;

    this.profileService.updateUserInfo(name, email).subscribe(() => {
      this.currentUser.name = name;
      this.isEditingName = false;
    });
  }

  public saveEmail(): void {
    this.isSubmitted = true;

    const { name } = this.currentUser;
    const email = this.editEmailInput.value?.trim();

    if (!name || !email) return;

    if (!this.regExpEmail.test(email)) {
      this.emailError = 'Incorrect email';

      return;
    }

    this.profileService.updateUserInfo(name, email).subscribe({
      next: () => {
        this.currentUser.email = email;
        this.isEditingEmail = false;
        this.emailError = '';
      },
      error: error => {
        if (error.error.message === 'Email already exists') {
          this.emailError = error.error.message;
        } else {
          console.error(error);
        }
      },
    });
  }

  public isEmailValid(): boolean {
    const email = this.editEmailInput.value?.trim();

    return this.regExpEmail.test(email || '');
  }

  public isNameValid(): boolean {
    const name = this.editNameInput.value?.trim();

    return name ? name.length > 0 : false;
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  private validateEmail(email: string | null): void {
    switch (true) {
      case email && !this.regExpEmail.test(email.trim()) && this.isSubmitted:
        this.emailError = 'Incorrect email';
        break;
      case !email && this.isSubmitted:
        this.emailError = 'Required';
        break;
      default:
        this.emailError = '';
        break;
    }
  }
}
