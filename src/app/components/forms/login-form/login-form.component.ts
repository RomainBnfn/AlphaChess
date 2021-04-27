import { Component, OnInit } from '@angular/core';
import { UserLoginData } from 'src/app/helpers/models/user-login-data';
import { AuthService } from 'src/app/helpers/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit() {}

  OnClickOnLogin = () => {};

  onSubmit() {
    const email = this.email?.value;
    const password = this.password?.value;

    this._authService
      .signInUser({
        login: email,
        password: password,
      })
      .then(
        () => {
          Swal.fire(
            'Connexion effectuée',
            'Vous êtes connecté, vous pouvez accéder au jeu.',
            'success'
          );
          this._router.navigate(['/']);
        },
        (error: string) => {
          if (
            error ==
            'Error: There is no user record corresponding to this identifier. The user may have been deleted.'
          ) {
            this.errorMessage =
              "Désolé mais aucun compte n'est associé pour cet identifiant.";
          } else if (
            error ==
            'Error: The password is invalid or the user does not have a password.'
          ) {
            this.errorMessage =
              'Désolé, mais le coupe email/mot de passe est incorrect.';
          } else {
            this.errorMessage = error;
          }
        }
      );
  }
}
