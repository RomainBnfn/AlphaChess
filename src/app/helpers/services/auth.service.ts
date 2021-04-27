import { Injectable } from '@angular/core';
import { UserRegisterData } from '../models/user-register-data';
import { UserLoginData } from '../models/user-login-data';

import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  createNewUser = (dataUser: UserRegisterData) => {
    return new Promise<void>((resolve, reject) => {
      if (!this.IsUserCorrect(dataUser))
        reject('Les informations de rentrées ne sont pas connectes.');
      else
        firebase
          .auth()
          .createUserWithEmailAndPassword(dataUser.login, dataUser.password)
          .then(() => resolve())
          .catch((error) => reject(error));
    });
  };

  signInUser = (data: UserLoginData) => {
    return new Promise<void>((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(data.login, data.password)
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  };

  signOut = () => {
    firebase.auth().signOut();
  };

  IsUserCorrect = (data: UserRegisterData) => {
    return (
      data.login == data.loginConfirmation &&
      data.password == data.passwordConfirmation &&
      data.login != '' &&
      data.password != ''
    );
  };
}
