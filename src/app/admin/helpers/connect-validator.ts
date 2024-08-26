import { AbstractControl, FormArray, ValidationErrors } from '@angular/forms';

export function minSelectedStations(min: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control instanceof FormArray) {
      return control.length >= min ? null : { minSelectedStations: true };
    }
    return null;
  };
}
