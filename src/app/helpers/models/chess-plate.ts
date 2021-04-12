import { ChessPiece } from './chess-piece';
import ChessPieceCategorie from '../enums/chess-piece-categorie';
import ChessPieceColor from '../enums/chess-piece-color';
import Position from './position';

export class ChessPlate {
  private plate: (ChessPiece | undefined)[][];

  constructor() {
    this.plate = [];
    this.initialisePlate();
  }

  public getPiece(x: number, y: number) {
    return this.plate[x][y];
  }

  private initialisePlate() {
    this.plate = new Array(8);
    for (let i = 0; i < 8; i++) {
      let col = new Array(8);
      //#region Pawns
      col[1] = new ChessPiece(
        i,
        1,
        ChessPieceColor.white,
        ChessPieceCategorie.pawn
      );
      col[6] = new ChessPiece(
        i,
        6,
        ChessPieceColor.black,
        ChessPieceCategorie.pawn
      );
      //#endregion
      let pieceWhite: ChessPiece;
      let pieceBlack: ChessPiece;
      // PIECE
      switch (i) {
        //#region Rooks
        case 0:
        case 7: // Rooks
          pieceWhite = new ChessPiece(
            i,
            0,
            ChessPieceColor.white,
            ChessPieceCategorie.rook
          );
          pieceBlack = new ChessPiece(
            i,
            7,
            ChessPieceColor.black,
            ChessPieceCategorie.rook
          );
          break;
        //#endregion
        //#region Knights
        case 1:
        case 6:
          pieceWhite = new ChessPiece(
            i,
            0,
            ChessPieceColor.white,
            ChessPieceCategorie.knight
          );
          pieceBlack = new ChessPiece(
            i,
            7,
            ChessPieceColor.black,
            ChessPieceCategorie.knight
          );
          break;
        //#endregion
        //#region Bishops
        case 2:
        case 5: // Bishops
          pieceWhite = new ChessPiece(
            i,
            0,
            ChessPieceColor.white,
            ChessPieceCategorie.bishop
          );
          pieceBlack = new ChessPiece(
            i,
            7,
            ChessPieceColor.black,
            ChessPieceCategorie.bishop
          );
          break;
        //#endregion
        //#region Queen/King
        case 3:
          pieceWhite = new ChessPiece(
            i,
            0,
            ChessPieceColor.white,
            ChessPieceCategorie.queen
          );
          pieceBlack = new ChessPiece(
            i,
            7,
            ChessPieceColor.black,
            ChessPieceCategorie.queen
          );
          break;
        //#endregion
        //#region King/Queen
        default:
          pieceWhite = new ChessPiece(
            i,
            0,
            ChessPieceColor.white,
            ChessPieceCategorie.king
          );
          pieceBlack = new ChessPiece(
            i,
            7,
            ChessPieceColor.black,
            ChessPieceCategorie.king
          );
          break;
        //#endregion
      }
      col[0] = pieceWhite;
      col[7] = pieceBlack;
      this.plate[i] = col;
    }
  }

  public getPlate() {
    return this.plate;
  }

  public movePiece(piece: ChessPiece, position: Position) {
    let oldPos = piece.position;
    this.plate[oldPos.x][oldPos.y] = undefined;
    this.plate[position.x][position.y] = piece;
    piece.position = position;
  }
}
