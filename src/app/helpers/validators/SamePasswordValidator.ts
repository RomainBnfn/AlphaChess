import { FormGroup, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';


/** A hero's name can't match the hero's alter ego */
export const SamePasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
  
    return (password && confirmPassword && password === confirmPassword) ? null : { notSame: true }  ;   
  };