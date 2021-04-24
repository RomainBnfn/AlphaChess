import { ChessPiece } from './chess-piece';
import ChessPieceCategorie from '../enums/chess-piece-categorie';
import ChessPieceColor from '../enums/chess-piece-color';
import Position, { areEqualPositions } from './position';

export class ChessPlate {
  private plate: (ChessPiece | undefined)[][];
  private lastMove:
    | { piece: ChessPiece; oldPos: Position; newPos: Position }
    | undefined;
  private whiteKing: ChessPiece;
  private blackKing: ChessPiece;

  constructor() {
    this.plate = [];
    this.whiteKing = new ChessPiece(0, 0, '', '');
    this.blackKing = new ChessPiece(0, 0, '', '');
    this.initialisePlate();
  }

  public getPiece(x: number, y: number) {
    return this.plate[x][y];
  }

  public getLastPieceMoved() {
    return this.lastMove?.piece;
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
        //#region Queen
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
        //#region King
        default:
          this.whiteKing = new ChessPiece(
            i,
            0,
            ChessPieceColor.white,
            ChessPieceCategorie.king
          );
          pieceWhite = this.whiteKing;

          this.blackKing = new ChessPiece(
            i,
            7,
            ChessPieceColor.black,
            ChessPieceCategorie.king
          );
          pieceBlack = this.blackKing;
          break;
        //#endregion
      }
      col[0] = pieceWhite;
      col[7] = pieceBlack;
      this.plate[i] = col;
    }
  }

  public isPieceAtPos(pos: Position) {
    return this.plate[pos.x][pos.y] != undefined;
  }

  public getPlate() {
    return this.plate;
  }

  public estEnEchecApresMouvement(
    team: string,
    piece: ChessPiece,
    pos: Position
  ): boolean {
    let oldPos = { x: piece.position.x, y: piece.position.y };
    let oldPiece = this.getPiece(pos.x, pos.y);

    this.plate[oldPos.x][oldPos.y] = undefined;
    this.plate[pos.x][pos.y] = piece;
    piece.position = pos;

    let result = this.estEnEchec(team);

    this.plate[oldPos.x][oldPos.y] = piece;
    this.plate[pos.x][pos.y] = oldPiece;
    piece.position = oldPos;

    return result;
  }

  public areSameTeam(pieceA: ChessPiece, pos: Position) {
    let pieceB = this.getPiece(pos.x, pos.y);
    if (pieceB == undefined) {
      return false;
    }
    return pieceA.color == pieceB.color;
  }

  public movePiece(piece: ChessPiece, position: Position) {
    let oldPos = { x: piece.position.x, y: piece.position.y };
    let direction = piece.color == 'white' ? 1 : -1;
    // Coups spéciaux
    if (
      // Prise en Passant
      piece.categorie == 'pawn' &&
      Math.abs(position.x - oldPos.x) == 1 && // diagonale
      Math.abs(position.y - oldPos.y) &&
      !this.isPieceAtPos(position)
    ) {
      this.plate[position.x][position.y - direction] = undefined;
    }

    this.plate[oldPos.x][oldPos.y] = undefined;
    // Pion en bout de terrain
    if (piece.categorie == 'pawn' && position.y == 3.5 * (1 + direction)) {
      piece = new ChessPiece(position.x, position.y, piece.color, 'queen');
    }

    this.lastMove = { piece: piece, newPos: position, oldPos: oldPos };
    this.plate[position.x][position.y] = piece;
    piece.moveTo(position);
  }

  public getDefendedPosition(team: string): Position[] {
    let defendedPos: Position[] = [];
    this.plate.forEach((line: (ChessPiece | undefined)[]) => {
      line.forEach((piece: ChessPiece | undefined) => {
        if (piece != undefined) {
          if (piece.color == team) {
            defendedPos = [...defendedPos, ...piece.getDefendedPosition(this)];
          }
        }
      });
    });

    return defendedPos;
  }

  public estEnEchec(team: string): boolean {
    let king = team == 'white' ? this.whiteKing : this.blackKing;
    let kingPos = king.position;
    let autreTeam = team == 'white' ? 'black' : 'white';
    return (
      this.getDefendedPosition(autreTeam).filter((pos: Position) => {
        return areEqualPositions(pos, kingPos);
      }).length != 0 // Si la pos du roi est dans les positions défendus de l'équipe adverse
    );
  }

  public estEnEchecEtMat(team: string): boolean {
    let result = true;
    this.plate.forEach((line: (ChessPiece | undefined)[]) => {
      line.forEach((piece: ChessPiece | undefined) => {
        if (piece != undefined) {
          if (piece.color == team) {
            piece.getMovablePositions(this).forEach((pos: Position) => {
              if (!this.estEnEchecApresMouvement(team, piece, pos)) {
                result = false;
              }
            });
          }
        }
      });
    });
    return result;
  }

  public isLastMooveDoubleStep() {
    if (this.lastMove == undefined) return false;
    return (
      this.lastMove?.piece.categorie == 'pawn' &&
      Math.abs(this.lastMove.oldPos.y - this.lastMove.newPos.y) == 2
    );
  }

  get winner(): string {
    if (this.estEnEchecEtMat('white')) return 'black';
    if (this.estEnEchecEtMat('black')) return 'white';
    return '';
  }
}
