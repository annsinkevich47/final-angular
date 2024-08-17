import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from '../../../core/services/api.service';
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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group<ILoginForm>({
      email: this.formBuilder.control('', [
        // Validators.required,
        // Validators.pattern(this.regExpEmail),
      ]),
      password: this.formBuilder.control('', [
        // Validators.required,
        // Validators.minLength(8),
      ]),
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  public onLoginSubmit(): void {
    if (this.loginForm.invalid) return;

    const email = this.formControls.email.value;
    const password = this.formControls.password.value;

    if (email && password) {
      this.apiService.signIn(email, password).subscribe({
        next: (response: ISignInResponse) => {
          console.log(response);
          localStorage.setItem('token', String(response.token));
          this.router.navigateByUrl('');
        },
        error: error => {
          console.error(error);
          // if (error.error.message === 'User already exists') {
          // this.emailExistsError = 'Account with this email already exists';
          // this.formControls.email.setErrors({ emailExists: true });
          // } else {
          //   console.error(error);
          // }
        },
      });
    }
  }
}
