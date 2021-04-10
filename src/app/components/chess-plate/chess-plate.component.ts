import { Component, OnInit } from '@angular/core';
import { ChessPlate } from 'src/app/helpers/models/chess-plate';

@Component({
  selector: 'app-chess-plate',
  templateUrl: './chess-plate.component.html',
  styleUrls: ['./chess-plate.component.scss'],
})
export class ChessPlateComponent implements OnInit {
  private chessPlate: ChessPlate;
  constructor() {
    this.chessPlate = new ChessPlate();
  }

  ngOnInit(): void {}
}
