import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { ISignInResponse } from '../../../shared/models/auth-response.model';
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
    private authService: AuthService
  ) {
    super();
  }

  get formControls() {
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
      this.signService.signIn(email, password).subscribe({
        next: (response: ISignInResponse) => {
          this.authService.login(response.token);
          this.router.navigateByUrl('/');
        },
        error: error => {
          if (error.error.message === 'User is not found') {
            this.incorrectEmailOrPassError = 'Incorrect email or password';
          } else {
            console.error(error);
          }
        },
      });
    }
  }
}
