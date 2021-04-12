import { Component, OnInit } from '@angular/core';
import { ChessPlate } from 'src/app/helpers/models/chess-plate';
import { ChessPiece } from 'src/app/helpers/models/chess-piece';
import Position from './../../helpers/models/position';

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
  drop(event: any) {
    console.log(event);
    console.log('x: ');
    console.log('y: ');
  }

  ngOnInit(): void {}

  getPiece(x: number, y: number) {
    return this.chessPlate.getPiece(x, y);
  }
  range(start: number, stop: number | undefined, step: number | undefined) {
    if (typeof stop == 'undefined') {
      // one param defined
      stop = start;
      start = 0;
    }

    if (typeof step == 'undefined') {
      step = 1;
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
      return [];
    }

    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
      result.push(i);
    }

    return result;
  }

  movePiece(piece: ChessPiece, position: Position) {
    this.chessPlate.movePiece(piece, position);
  }

  clicked(piece: ChessPiece | undefined) {
    if (typeof piece == 'undefined') {
      return;
    }
    this.movePiece(piece, { x: piece.position.x, y: piece.position.y + 1 });
  }
}
