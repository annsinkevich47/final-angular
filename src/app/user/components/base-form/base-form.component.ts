import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

export interface FormControls {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  [key: string]: FormControl<string | null>;
}

@Component({
  template: '',
})
export abstract class BaseFormComponent<T extends FormControls>
  implements OnInit
{
  public form!: FormGroup<T>;
  public isSubmittedForm: boolean = false;
  public emailExistsError: string = '';
  public incorrectEmailOrPassError: string = '';
  protected readonly regExpEmail = '^[\\w\\d_]+@[\\w\\d_]+\\.\\w{2,7}$';

  public ngOnInit(): void {
    this.initializeForm();
    this.setupValueChangeListeners();
  }

  protected abstract initializeForm(): void;

  protected setupValueChangeListeners(): void {
    this.form.controls.email.valueChanges.subscribe(() => {
      this.emailExistsError = '';
      this.incorrectEmailOrPassError = '';
    });

    this.form.controls.password.valueChanges.subscribe(() => {
      this.incorrectEmailOrPassError = '';
    });

    this.form.controls.password.valueChanges.subscribe(value => {
      if (value) {
        this.form.controls.password.setValue(value.trim(), {
          emitEvent: false,
        });
      }
    });
  }

  public onSubmit(): void {
    this.isSubmittedForm = true;
    if (this.form.invalid) return;

    this.handleSubmit();
  }

  protected abstract handleSubmit(): void;
}
