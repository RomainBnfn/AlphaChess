import { Component, OnInit } from '@angular/core';
import { ChessGameService } from 'src/app/services/chess-game.service';
import { Opponent } from 'src/app/helpers/models/opponent';

@Component({
  selector: 'app-duel-list',
  templateUrl: './duel-list.component.html',
  styleUrls: ['./duel-list.component.scss'],
})
export class DuelListComponent implements OnInit {
  constructor(private _game: ChessGameService) {}

  ngOnInit(): void {}

  reponseDuel(reponse: boolean, opponent: Opponent) {
    if (reponse) {
      this._game.accepterDuel(opponent);
    } else {
      this._game.refuserDuel(opponent);
    }
  }

  get duelsReceived() {
    return this._game.duelsReceived;
  }
}
