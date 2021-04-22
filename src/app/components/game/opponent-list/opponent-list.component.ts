import { Component, OnInit, Input } from '@angular/core';
import { ChessGameService } from 'src/app/services/chess-game.service';
import { Opponent } from 'src/app/helpers/models/opponent';

@Component({
  selector: 'app-opponent-list',
  templateUrl: './opponent-list.component.html',
  styleUrls: ['./opponent-list.component.scss'],
})
export class OpponentListComponent implements OnInit {
  constructor(private _game: ChessGameService) {}

  ngOnInit(): void {}

  demandeDuel(event: null, opponent: Opponent) {
    this._game.demanderDuel(opponent);
  }

  isInDuelSent(opponent: Opponent) {
    return this._game.isInDuelSent(opponent);
  }

  get opponents() {
    return this._game.opponents;
  }
}
