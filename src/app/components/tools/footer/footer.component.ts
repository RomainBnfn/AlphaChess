import { Component, OnInit } from '@angular/core';

import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  isAuth: boolean;

  constructor(
    private _authService: AuthService,
    private _user: UserService,
    private _router: Router
  ) {
    this.isAuth = false;
    firebase.auth().onAuthStateChanged((user) => {
      this.isAuth = user ? true : false;
    });
  }
  //  this.getRouter().url == '/register'
  ngOnInit(): void {}

  onSignOut = () => {
    this._authService.signOut();
    this._router.navigate(['']);
  };

  getRouter() {
    return this._router;
  }

  disconnect() {
    this._authService.signOut();
    this._user.signOut();
    Swal.fire(
      'Deconnécté',
      "Vous pouvez soufler, vous n'êtes plus connecté !",
      'success'
    );
  }
}
