import { Component, OnInit } from '@angular/core';
import { IconButtonComponent } from '../../components/icon-button/icon-button.component';
import { ChessPlate } from '../../helpers/models/chess-plate';
import { ChessPiece } from 'src/app/helpers/models/chess-piece';
import { Router } from '@angular/router';

import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../../styles/global-style.css'],
})
export class HomeComponent implements OnInit {
  isAuth: boolean;

  constructor(private _router: Router) {
    this.isAuth = false;
    firebase.auth().onAuthStateChanged((user) => {
      this.isAuth = user ? true : false;
    });
  }

  ngOnInit(): void {}

  get router(): Router {
    return this._router;
  }
}
