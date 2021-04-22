import { Component, OnInit } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';
import { ChessGameService } from 'src/app/services/chess-game.service';

import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';

import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ChessPiece } from 'src/app/helpers/models/chess-piece';

import Position from './../../../helpers/models/position';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss', '../../../styles/global-style.css'],
})
export class PlayComponent implements OnInit {
  constructor(
    private _chessGame: ChessGameService,
    private _spinner: NgxSpinnerService,
    private _router: Router,
    private _user: UserService
  ) {
    if (this.hasPseudo) {
      this._user.initConnexion(this.pseudo);
    }
  }

  onPseudoChoosen(response: { pseudo: string }) {
    if (!this.hasPseudo) {
      this._user.initConnexion(response.pseudo);
      return;
    }
    this._user.changeName(response.pseudo);
  }

  onPieceMove(piece: ChessPiece, pos: Position) {
    this._chessGame.turn(piece, pos);
  }

  get isInGame() {
    return this._chessGame.isInGame;
  }

  get connected() {
    return this._chessGame.isConnected;
  }

  get hasPseudo() {
    return this.pseudo != null && this.pseudo != '';
  }

  get pseudo() {
    return this._user.displayName;
  }

  get imageURL() {
    return this._user.photoURL;
  }

  get email() {
    return this._user.email;
  }

  get isMyTurn() {
    return this._chessGame.myTurn;
  }

  get chessPlate() {
    return this._chessGame.chessPlate;
  }

  get team() {
    return this._chessGame.myTeam;
  }

  ngOnInit() {
    this._spinner.show();
  }
}
