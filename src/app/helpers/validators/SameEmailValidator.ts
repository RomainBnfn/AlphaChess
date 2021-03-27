import {
  FormGroup,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

/** A hero's name can't match the hero's alter ego */
export const SameEmailValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const email = control.get('email');
  const emailConfirmation = control.get('emailConfirmation');

  return email && emailConfirmation && email.value === emailConfirmation.value
    ? null
    : { NotSameEmail: true };
};
