import Position from './position';
import { ChessPlate } from './chess-plate';

export class ChessPiece {
  position: Position;
  categorie: string;
  hasMooved: boolean;
  color: string;

  constructor(x: number, y: number, color: string, chessCategorie: string) {
    this.position = { x: x, y: y };
    this.color = color;
    this.categorie = chessCategorie;
    this.hasMooved = false;
  }

  public moveTo(position: Position) {
    this.hasMooved = true;
    this.position.x = position.x;
    this.position.y = position.y;
  }

  public getMovablePositions(plate: ChessPlate): Position[] {
    let potentialPos = this.getPotentialMovablePositions(plate);
    // ATTENTION : PAS ROI EN ECHEC
    potentialPos = potentialPos.filter((pos: Position) => {
      // Si la pièce bouge ici, le roi n'est pas en échec
      return !plate.estEnEchecApresMouvement(this.color, this, pos);
    });
    return potentialPos;
  }

  public getPotentialMovablePositions(plate: ChessPlate): Position[] {
    // TODO ROQUE
    let movablePositions: Position[] = [];

    let pos: Position;
    let potentialPos: Position[] = [];
    switch (this.categorie) {
      //#region Pawn
      case 'pawn':
        let direction = this.color == 'white' ? 1 : -1;
        // pos devant lui
        pos = { x: this.position.x, y: this.position.y + direction };
        // Si il y a personne devant lui(Avancer)
        if (!plate.isPieceAtPos(pos) && this.isInPlatePosition(pos)) {
          movablePositions.push(pos);
          // Encore au début
          if (
            (this.color == 'white' && this.position.y == 1) ||
            (this.color == 'black' && this.position.y == 6)
          ) {
            pos = { x: this.position.x, y: this.position.y + 2 * direction };
            if (!plate.isPieceAtPos(pos)) {
              movablePositions.push(pos);
            }
          }
        }
        // S'il peut manger sur les côtées (Manger)
        potentialPos = [];
        pos = { x: this.position.x + 1, y: this.position.y + direction };
        potentialPos.push(pos);
        pos = { x: this.position.x - 1, y: this.position.y + direction };
        potentialPos.push(pos);

        if (this.position.y == 3.5 + 0.5 * direction) {
          // Prise en passant
          let potentialPriseEnPassant: Position[] = [];
          pos = { x: this.position.x + 1, y: this.position.y };
          potentialPriseEnPassant.push(pos);
          pos = { x: this.position.x - 1, y: this.position.y };
          potentialPriseEnPassant.push(pos);

          potentialPriseEnPassant.forEach((pos: Position) => {
            if (this.isInPlatePosition(pos)) {
              let piece = plate.getPiece(pos.x, pos.y);
              if (piece != undefined) {
                if (
                  piece?.categorie == 'pawn' &&
                  piece?.color != this.color &&
                  plate.getLastPieceMoved() == piece &&
                  plate.isLastMooveDoubleStep()
                ) {
                  movablePositions.push({ x: pos.x, y: pos.y + direction });
                }
              }
            }
          });
        }
        potentialPos.forEach((pos: Position) => {
          if (
            this.isInPlatePosition(pos) &&
            plate.isPieceAtPos(pos) &&
            !plate.areSameTeam(this, pos)
          ) {
            movablePositions.push(pos);
          }
        });
        // Prise en passant
        break;
      //#endregion
      //#region Knight
      case 'knight':
        for (let i = -1; i <= 2; i += 2) {
          potentialPos = [];
          potentialPos.push({ x: this.position.x + 2, y: this.position.y + i });
          potentialPos.push({ x: this.position.x - 2, y: this.position.y + i });
          potentialPos.push({ x: this.position.x + i, y: this.position.y + 2 });
          potentialPos.push({ x: this.position.x + i, y: this.position.y - 2 });
          potentialPos.forEach((pos: Position) => {
            if (this.isInPlatePosition(pos) && !plate.areSameTeam(this, pos)) {
              movablePositions.push(pos);
            }
          });
        }
        break;
      //#endregion
      //#region Rook
      case 'rook':
        this.getStraightBranches(this.position.x, this.position.y).forEach(
          (branche: Position[]) => {
            let _continue = true;
            branche.forEach((pos: Position) => {
              if (_continue) {
                // On rencontre un allier
                if (plate.areSameTeam(this, pos)) {
                  _continue = false;
                } else {
                  movablePositions.push(pos);
                  if (plate.isPieceAtPos(pos)) {
                    _continue = false;
                  }
                }
              }
            });
          }
        );
        break;
      //#endregion
      //#region Bishop
      case 'bishop':
        this.getDiagonalBranches(this.position.x, this.position.y).forEach(
          (branche: Position[]) => {
            let _continue = true;
            branche.forEach((pos: Position) => {
              if (_continue) {
                // On rencontre un allier
                if (plate.areSameTeam(this, pos)) {
                  _continue = false;
                } else {
                  movablePositions.push(pos);
                  if (plate.isPieceAtPos(pos)) {
                    _continue = false;
                  }
                }
              }
            });
          }
        );
        break;
      //#endregion
      //#region Queen
      case 'queen':
        this.getDiagonalBranches(this.position.x, this.position.y).forEach(
          (branche: Position[]) => {
            let _continue = true;
            branche.forEach((pos: Position) => {
              if (_continue) {
                // On rencontre un allier
                if (plate.areSameTeam(this, pos)) {
                  _continue = false;
                } else {
                  movablePositions.push(pos);
                  if (plate.isPieceAtPos(pos)) {
                    _continue = false;
                  }
                }
              }
            });
          }
        );
        this.getStraightBranches(this.position.x, this.position.y).forEach(
          (branche: Position[]) => {
            let _continue = true;
            branche.forEach((pos: Position) => {
              if (_continue) {
                // On rencontre un allier
                if (plate.areSameTeam(this, pos)) {
                  _continue = false;
                } else {
                  movablePositions.push(pos);
                  if (plate.isPieceAtPos(pos)) {
                    _continue = false;
                  }
                }
              }
            });
          }
        );
        break;
      //#endregion
      //#region  King
      case 'king':
        potentialPos = [];
        for (let i = -1; i <= 1; i++) {
          potentialPos.push({ x: this.position.x + i, y: this.position.y + 1 });
          potentialPos.push({ x: this.position.x + i, y: this.position.y - 1 });
        }
        potentialPos.push({ x: this.position.x + 1, y: this.position.y });
        potentialPos.push({ x: this.position.x - 1, y: this.position.y });
        potentialPos.forEach((pos: Position) => {
          if (this.isInPlatePosition(pos) && !plate.areSameTeam(this, pos)) {
            movablePositions.push(pos);
          }
        });

        break;
      //#endregion
    }
    return movablePositions;
  }

  public getDefendedPosition(plate: ChessPlate): Position[] {
    let movablePositions = this.getPotentialMovablePositions(plate);
    let pos: Position;
    if (this.categorie == 'pawn') {
      let direction = this.color == 'white' ? 1 : -1;
      pos = { x: this.position.x + 1, y: this.position.y + direction };
      if (this.isInPlatePosition(pos)) {
        movablePositions.push(pos);
      }
      pos = { x: this.position.x - 1, y: this.position.y + direction };
      if (this.isInPlatePosition(pos)) {
        movablePositions.push(pos);
      }
    }
    return movablePositions;
  }

  private isInPlatePosition(position: Position): boolean {
    return (
      position.x >= 0 && position.x <= 7 && position.y >= 0 && position.y <= 7
    );
  }

  private stepBranchOperator(op: Function, branches: Position[][]) {
    let branche: Position[] = [];
    for (let i = 1; i < 8; i++) {
      let pos = op(i);
      if (!this.isInPlatePosition(pos)) {
        break;
      }
      branche.push(pos);
    }
    branches.push(branche);
  }

  private getDiagonalBranches(x: number, y: number) {
    let branches: Position[][] = [];
    this.stepBranchOperator((i: number) => {
      return { x: x + i, y: y + i };
    }, branches);
    this.stepBranchOperator((i: number) => {
      return { x: x + i, y: y - i };
    }, branches);
    this.stepBranchOperator((i: number) => {
      return { x: x - i, y: y + i };
    }, branches);
    this.stepBranchOperator((i: number) => {
      return { x: x - i, y: y - i };
    }, branches);
    return branches;
  }

  private getStraightBranches(x: number, y: number) {
    let branches: Position[][] = [];
    this.stepBranchOperator((i: number) => {
      return { x: x + i, y: y };
    }, branches);
    this.stepBranchOperator((i: number) => {
      return { x: x - i, y: y };
    }, branches);
    this.stepBranchOperator((i: number) => {
      return { x: x, y: y + i };
    }, branches);
    this.stepBranchOperator((i: number) => {
      return { x: x, y: y - i };
    }, branches);
    return branches;
  }
}
