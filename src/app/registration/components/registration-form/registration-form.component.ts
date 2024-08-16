import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

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

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group<ISignUpForm>(
      {
        email: this.formBuilder.control('', [
          Validators.required,
          Validators.email,
        ]),
        password: this.formBuilder.control('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        repeatPassword: this.formBuilder.control('', [Validators.required]),
      },
      { validators: PasswordMatchValidator }
    );
  }

  get formControls() {
    return this.signupForm.controls;
  }

  onSignupSubmit() {
    if (this.signupForm.invalid) return;

    const email = this.formControls.email.value;
    const password = this.formControls.password.value;
    const repeatPassword = this.formControls.repeatPassword.value;

    if (email && password && password === repeatPassword) {
      this.authService.signUp(email, password).subscribe();
    }
  }
}
