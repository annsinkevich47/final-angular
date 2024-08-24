import { AbstractControl, ValidationErrors } from '@angular/forms';

export const PasswordMatchValidator = (
  control: AbstractControl,
): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const repeatPassword = control.get('repeatPassword')?.value;

  const isValid = repeatPassword && password !== repeatPassword;

  return isValid ? { passwordsMismatch: true } : null;
};
