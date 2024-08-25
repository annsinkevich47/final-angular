import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';

import { AuthService } from '../../../core/services/auth.service';
import { ISignInResponse } from '../../../shared/models/auth-response.model';
import { IProfileResponse } from '../../../shared/models/profile-response.module';
import { ProfileService } from '../../services/profile.service';
import { SignService } from '../../services/sign.service';
import {
  BaseFormComponent,
  FormControls,
} from '../base-form/base-form.component';

interface ILoginForm extends FormControls {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent extends BaseFormComponent<ILoginForm> {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private signService: SignService,
    private authService: AuthService,
    private profileService: ProfileService,
  ) {
    super();
  }

  public get formControls() {
    return this.form.controls;
  }

  protected initializeForm(): void {
    this.form = this.formBuilder.group<ILoginForm>({
      email: this.formBuilder.control('', [
        Validators.required,
        Validators.pattern(this.regExpEmail),
      ]),
      password: this.formBuilder.control('', [
        Validators.required,
        // Validators.minLength(8),
      ]),
    });
  }

  protected handleSubmit(): void {
    const email = this.formControls.email.value;
    const password = this.formControls.password.value;

    if (email && password) {
      this.signInAndGetUserInfo(email, password);
    }
  }

  private signInAndGetUserInfo(email: string, password: string): void {
    this.signService
      .signIn(email, password)
      .pipe(
        switchMap((response: ISignInResponse) => {
          this.authService.login(response.token);
          return this.profileService.getUserInfo();
        }),
        catchError(error => {
          this.handleError(error);
          return of(null);
        }),
      )
      .subscribe({
        next: (userInfo: IProfileResponse | null) => {
          if (userInfo) {
            this.authService.setUserData(userInfo);
            this.router.navigateByUrl('/');
          }
        },
      });
  }

  private handleError(error: HttpErrorResponse): void {
    if (error.error.message === 'User is not found') {
      this.incorrectEmailOrPassError = 'Incorrect email or password';
    } else {
      console.error(error);
    }
  }
}
