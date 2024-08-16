import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { PasswordMatchValidator } from '../../helpers/passwordsMatch.validator';

interface ISignUpForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  repeatPassword: FormControl<string | null>;
}

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.scss',
})
export class RegistrationFormComponent implements OnInit {
  public signupForm!: FormGroup<ISignUpForm>;
  public emailExistsError: string = '';
  public submitted: boolean = false;
  private readonly regExpEmail =
    '^[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z0-9]{2,7}$';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group<ISignUpForm>(
      {
        email: this.formBuilder.control('', [
          Validators.required,
          Validators.pattern(this.regExpEmail),
        ]),
        password: this.formBuilder.control('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        repeatPassword: this.formBuilder.control('', [Validators.required]),
      },
      { validators: PasswordMatchValidator }
    );

    this.formControls.email.valueChanges.subscribe(() => {
      this.emailExistsError = '';
    });
  }

  get formControls() {
    return this.signupForm.controls;
  }

  onSignupSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) return;

    const email = this.formControls.email.value;
    const password = this.formControls.password.value;
    const repeatPassword = this.formControls.repeatPassword.value;

    if (email && password && password === repeatPassword) {
      this.authService.signUp(email, password).subscribe({
        next: () => {
          this.emailExistsError = '';
          this.router.navigateByUrl('/signin');
        },
        error: error => {
          if (error.error.message === 'User already exists') {
            this.emailExistsError = 'Account with this email already exists';
            this.formControls.email.setErrors({ emailExists: true });
          } else {
            console.error(error);
          }
        },
      });
    }
  }
}
