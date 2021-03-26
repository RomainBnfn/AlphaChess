import { Component, OnInit } from '@angular/core';
import { UserRegisterData } from 'src/app/helpers/models/user-register-data';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SamePasswordValidator } from 'src/app/helpers/validators/SamePasswordValidator';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {

  ngOnInit(): void {
  }

  signUpForm: FormGroup;
  errorMessage = "";
  
  constructor(private _formBuilder : FormBuilder,
              private _authService : AuthService,
              private _router : Router) {
    this.signUpForm = this._formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      emailConfirmation : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      passwordConfirmation : ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    }, { validators: SamePasswordValidator });
  }

  onSubmit = () => {
    const email = this.signUpForm.get('email')?.value;
    const emailConfirmation = this.signUpForm.get('email')?.value;
    const password = this.signUpForm.get('password')?.value;
    const passwordConfirmation = this.signUpForm.get('passwordConfirmation')?.value;
    this._authService.createNewUser(
      {
        login: email,
        loginConfirmation: emailConfirmation,
        password: password,
        passwordConfirmation: passwordConfirmation
      }
    ).then(
      ()=>{
        this._router.navigate(['/']);
      },
      (error : string) => {
        this.errorMessage = error;
      }
    )
  }

  //TODO: Autre version avec les différents messages de réponse
}
