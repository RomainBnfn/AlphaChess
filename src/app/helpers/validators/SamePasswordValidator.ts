import {
  FormGroup,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

/** A hero's name can't match the hero's alter ego */
export const SamePasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const passwordConfirmation = control.get('passwordConfirmation');

  return password &&
    passwordConfirmation &&
    password.value === passwordConfirmation.value
    ? null
    : { NotSamePassword: true };
};
