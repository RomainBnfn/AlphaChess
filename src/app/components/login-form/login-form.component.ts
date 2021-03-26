import { Component, OnInit } from '@angular/core';
import { UserLoginData } from 'src/app/helpers/models/user-login-data';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  userLoginData: UserLoginData = {
    login: '',
    password: '',
  };
  constructor(private _authService: AuthService) {}

  ngOnInit() {}

  OnClickOnLogin = () => {};
}
