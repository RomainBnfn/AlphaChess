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
  selectedPiece: ChessPiece | undefined;
  potentialMoves: Position[];

  constructor() {
    this.chessPlate = new ChessPlate();
    this.potentialMoves = [];
  }

  ngOnInit(): void {}

  getPiece(x: number, y: number) {
    return this.chessPlate.getPiece(x, y);
  }

  movePiece(piece: ChessPiece, position: Position) {
    this.chessPlate.movePiece(piece, position);
  }

  clickOnCase(x: number, y: number) {
    if (this.selectedPiece) {
      if (this.estPotentielMove(x, y)) {
        this.movePiece(this.selectedPiece, { x: x, y: y });
      }
      this.selectedPiece = undefined;
      this.potentialMoves = [];
      return;
    }
    this.selectedPiece =
      this.selectedPiece == this.getPiece(x, y)
        ? undefined
        : this.getPiece(x, y);

    this.potentialMoves = [];
    if (this.selectedPiece) {
      this.potentialMoves = this.selectedPiece.getMovablePositions(
        this.chessPlate
      );
    }
  }

  estPotentielMove(x: number, y: number) {
    return this.potentialMoves.some((e) => e.x == x && e.y == y);
  }
}
