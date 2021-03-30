import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    private _router : Router
  ) { }

  canActivate() : Observable<boolean> | Promise<boolean> {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().onAuthStateChanged(
          (user) => {
            if(user) {
              resolve(true);
            } 
            else {
              this._router.navigate(['/']);
              resolve(false);
            }
          }
        )
      }
    )
  }
  
}
