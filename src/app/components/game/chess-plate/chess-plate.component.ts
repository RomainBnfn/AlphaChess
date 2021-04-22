import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChessPlate } from 'src/app/helpers/models/chess-plate';
import { ChessPiece } from 'src/app/helpers/models/chess-piece';
import Position from './../../../helpers/models/position';
import { ChessGameService } from 'src/app/services/chess-game.service';

@Component({
  selector: 'app-chess-plate',
  templateUrl: './chess-plate.component.html',
  styleUrls: ['./chess-plate.component.scss'],
})
export class ChessPlateComponent implements OnInit {
  @Input() chessPlate: ChessPlate = new ChessPlate();
  @Input() disabled: boolean = true;
  @Input() team: string = 'white';
  @Output() onPieceMove = new EventEmitter<{
    piece: ChessPiece;
    position: Position;
  }>();

  selectedPiece: ChessPiece | undefined;
  potentialMoves: Position[];

  constructor(_chess: ChessGameService) {
    this.potentialMoves = [];
  }

  ngOnInit(): void {}

  getPiece(x: number, y: number) {
    return this.chessPlate.getPiece(x, y);
  }

  movePiece(piece: ChessPiece, position: Position) {
    if (piece.color != this.team || this.disabled) {
      return;
    }
    this.onPieceMove.emit({ piece: piece, position: position });
  }

  clickOnCase(x: number, y: number) {
    if (this.disabled) {
      return;
    }
    if (this.selectedPiece) {
      if (this.estPotentielMove(x, y)) {
        this.movePiece(this.selectedPiece, { x: x, y: y });
      }
      this.selectedPiece = undefined;
      this.potentialMoves = [];
      return;
    }
    let piece = this.selectedPiece ? undefined : this.getPiece(x, y);

    if (piece && piece.color != this.team) {
      this.selectedPiece = undefined;
      return;
    }
    this.selectedPiece = piece;

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

  get yList() {
    return this.team == 'white'
      ? [7, 6, 5, 4, 3, 2, 1, 0]
      : [0, 1, 2, 3, 4, 5, 6, 7];
  }
}
