import {
  AbstractControl,
  FormArray,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function minSelectedStations(min: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control instanceof FormArray) {
      return control.length >= min ? null : { minSelectedStations: true };
    }
    return null;
  };
}

export function noDefaultSelectionsValidator(): ValidatorFn {
  return (formArray: AbstractControl): ValidationErrors | null => {
    const formArrayControl = formArray as FormArray;
    const hasDefaultSelection = formArrayControl.controls.some(
      control => control.value === ''
    );
    return hasDefaultSelection ? { defaultSelection: true } : null;
  };
}
