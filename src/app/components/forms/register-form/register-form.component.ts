import { Component, OnInit } from '@angular/core';
import { UserRegisterData } from 'src/app/helpers/models/user-register-data';
import { AuthService } from '../../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SamePasswordValidator } from 'src/app/helpers/validators/SamePasswordValidator';
import { SameEmailValidator } from 'src/app/helpers/validators/SameEmailValidator';

import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  ngOnInit(): void {}

  signUpForm: FormGroup;
  errorMessage = '';

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) {
    this.signUpForm = this._formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        emailConfirmation: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern(/.{6,}/)]],
        passwordConfirmation: [
          '',
          [Validators.required, Validators.pattern(/.{6,}/)],
        ],
      },
      { validators: [SamePasswordValidator, SameEmailValidator] }
    );
  }

  get email() {
    return this.signUpForm.get('email');
  }
  get emailConfirmation() {
    return this.signUpForm.get('emailConfirmation');
  }
  get password() {
    return this.signUpForm.get('password');
  }
  get passwordConfirmation() {
    return this.signUpForm.get('passwordConfirmation');
  }

  onSubmit() {
    const email = this.email?.value;
    const emailConfirmation = this.emailConfirmation?.value;
    const password = this.password?.value;
    const passwordConfirmation = this.passwordConfirmation?.value;

    this._authService
      .createNewUser({
        login: email,
        loginConfirmation: emailConfirmation,
        password: password,
        passwordConfirmation: passwordConfirmation,
      })
      .then(
        () => {
          Swal.fire(
            'Inscription réussite',
            'Vous êtes désormais inscrit sur AlphaChess.',
            'success'
          );
          this._router.navigate(['/']);
        },
        (error: string) => {
          this.errorMessage = error;
        }
      );
  }
}
