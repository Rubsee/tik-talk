import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  standalone: true,
  selector: '[noReact]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: NoReactValidator,
      multi: true,
    },
  ],
})
export class NoReactValidator implements Validator {
  change!: () => void;

  validate(control: AbstractControl): ValidationErrors | null {
    return control.value.toLowerCase() === 'react'
      ? { noReact: { message: `НИКАКИХ РЕАКТОВ!!! ${control.status}` } }
      : null;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.change = fn;
  }
}
