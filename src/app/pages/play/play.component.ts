import { Component, OnInit } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';
import { ChessGameService } from 'src/app/services/chess-game.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss', '../../styles/global-style.css'],
})
export class PlayComponent implements OnInit {
  constructor(
    private _chessGame: ChessGameService,
    private _spinner: NgxSpinnerService
  ) {
    /*
    this._socketService.listen('test').subscribe((data) => {
      console.log('');
      console.log(data);
    });
    this._socketService.listen('message').subscribe((data) => {
      console.log('Message :');
      console.log(data);
    });
    */
  }

  cli() {
    this._chessGame.askForPseudo('pizzza');
  }

  get connected() {
    return this._chessGame.isConnected;
  }

  get hasPseudo() {
    return this._chessGame.pseudoResponse;
  }

  get pseudo() {
    return this._chessGame.pseudo;
  }

  ngOnInit() {
    this._spinner.show();
  }

  btnClicked() {}
}
