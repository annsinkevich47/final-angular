import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PasswordMatchValidator } from '../../helpers/passwordsMatch.validator';
import { SignService } from '../../services/sign.service';
import {
  BaseFormComponent,
  FormControls,
} from '../base-form/base-form.component';

interface ISignUpForm extends FormControls {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  repeatPassword: FormControl<string | null>;
}

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.scss',
})
export class RegistrationFormComponent extends BaseFormComponent<ISignUpForm> {
  constructor(
    private router: Router,
    private signService: SignService,
    private formBuilder: FormBuilder
  ) {
    super();
  }

  public get formControls() {
    return this.form.controls;
  }

  protected initializeForm(): void {
    this.form = this.formBuilder.group<ISignUpForm>(
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

    this.form.controls.repeatPassword.valueChanges.subscribe(value => {
      if (value) {
        this.form.controls.repeatPassword.setValue(value.trim(), {
          emitEvent: false,
        });
      }
    });
  }

  protected handleSubmit(): void {
    const email = this.form.controls.email.value;
    const password = this.form.controls.password.value?.trim();
    const repeatPassword = this.form.controls.repeatPassword.value?.trim();

    if (email && password && password === repeatPassword) {
      this.signService.signUp(email, password).subscribe({
        next: () => {
          this.router.navigateByUrl('/signin');
        },
        error: error => {
          if (error.error.message === 'User already exists') {
            this.emailExistsError = 'Account with this email already exists';
          } else {
            console.error(error);
          }
        },
      });
    }
  }
}
