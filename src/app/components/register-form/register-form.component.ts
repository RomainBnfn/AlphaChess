import { Component, OnInit } from '@angular/core';
import { UserRegisterData } from 'src/app/helpers/models/user-register-data';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  registerUserData: UserRegisterData = {
    login: '',
    loginConfirmation: '',
    password: '',
    passwordConfirmation: '',
  };

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {}

  OnClickOnRegister = () => {
    this._authService.createNewUser(this.registerUserData);
  };
}
