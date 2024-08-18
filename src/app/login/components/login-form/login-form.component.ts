import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../../../core/services/auth.service';
import { ISignInResponse } from '../../../shared/models/auth-response.model';

interface ILoginForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent implements OnInit {
  public loginForm!: FormGroup<ILoginForm>;
  public incorrectEmailOrPassError: string = '';
  public isSubmittedForm: boolean = false;
  private readonly regExpEmail = '^[\\w\\d_]+@[\\w\\d_]+\\.\\w{2,7}$';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group<ILoginForm>({
      email: this.formBuilder.control('', [
        Validators.required,
        Validators.pattern(this.regExpEmail),
      ]),
      password: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });

    this.formControls.email.valueChanges.subscribe(() => {
      this.incorrectEmailOrPassError = '';
    });

    this.formControls.password.valueChanges.subscribe(() => {
      this.incorrectEmailOrPassError = '';
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  public onLoginSubmit(): void {
    this.isSubmittedForm = true;

    if (this.loginForm.invalid) return;

    const email = this.formControls.email.value;
    const password = this.formControls.password.value;

    if (email && password) {
      this.apiService.signIn(email, password).subscribe({
        next: (response: ISignInResponse) => {
          this.authService.login(response.token);
          this.router.navigateByUrl('/');
        },
        error: error => {
          console.error(error);
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
