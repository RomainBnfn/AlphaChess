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

  public canMove(x: number, y: number): boolean {
    return true;
  }

  public getMovablePositions(plate: ChessPlate): Position[] {
    let movablePositions = [];
    let movablesBranches = this.getPotentialMovableBranches(plate);
    for (let i = 0; i < movablesBranches.length; i++) {
      for (let j = 0; j < movablesBranches[i].length; j++) {
        let x = movablesBranches[i][j].x;
        let y = movablesBranches[i][j].y;
        let piece = plate.getPiece(x, y);
        if (piece) {
          if (piece.color != this.color && this.categorie != 'pawn') {
            // & roi alors que la pièce est protégée.
            movablePositions.push(movablesBranches[i][j]);
          }
          break;
        } else {
          movablePositions.push(movablesBranches[i][j]);
        }
      }
    }
    return movablePositions;
  }

  /**
   * @returns
   */
  private getPotentialMovableBranches(plate: ChessPlate) {
    let branches: Position[][] = [];
    let pos: Position;
    switch (this.categorie) {
      //#region Pawn
      case 'pawn':
        let side = 0;
        if (this.color == 'white') {
          side = 1;
          pos = { x: this.position.x, y: this.position.y + 1 };
          if (this.isInPlatePosition(pos)) {
            branches.push([pos]);
          }
          if (this.position.y == 1) {
            pos = { x: this.position.x, y: this.position.y + 2 };
            if (this.isInPlatePosition(pos)) {
              branches[0].push(pos);
            }
          }
        } else {
          // Black
          side = -1;
          pos = { x: this.position.x, y: this.position.y - 1 };
          if (this.isInPlatePosition(pos)) {
            branches.push([pos]);
          }
          if (this.position.y == 6) {
            pos = { x: this.position.x, y: this.position.y - 2 };
            if (this.isInPlatePosition(pos)) {
              branches[0].push(pos);
            }
          }
        }
        if (plate.getPiece(this.position.x - 1, this.position.y + side)) {
          branches.push([
            { x: this.position.x - 1, y: this.position.y + side },
          ]);
        }
        if (plate.getPiece(this.position.x + 1, this.position.y + side)) {
          branches.push([
            { x: this.position.x + 1, y: this.position.y + side },
          ]);
        }
        break;
      //#endregion
      //#region Knight
      case 'knight':
        for (let i = -1; i <= 2; i += 2) {
          pos = { x: this.position.x + 2, y: this.position.y + i };
          if (this.isInPlatePosition(pos)) {
            branches.push([pos]);
          }
          pos = { x: this.position.x - 2, y: this.position.y + i };
          if (this.isInPlatePosition(pos)) {
            branches.push([pos]);
          }
          pos = { x: this.position.x + i, y: this.position.y + 2 };
          if (this.isInPlatePosition(pos)) {
            branches.push([pos]);
          }
          pos = { x: this.position.x + i, y: this.position.y - 2 };
          if (this.isInPlatePosition(pos)) {
            branches.push([pos]);
          }
        }
        break;
      //#endregion
      case 'rook':
        branches = this.getStraightBranches(this.position.x, this.position.y);
        break;
      case 'bishop':
        branches = this.getDiagonalBranches(this.position.x, this.position.y);
        break;
      case 'queen':
        branches = this.getDiagonalBranches(this.position.x, this.position.y);
        this.getStraightBranches(
          this.position.x,
          this.position.y
        ).forEach((branche) => branches.push(branche));
        break;
      //#region  King
      case 'king':
        for (let i = -1; i <= 1; i++) {
          pos = { x: this.position.x + i, y: this.position.y + 1 };
          if (this.isInPlatePosition(pos)) {
            branches.push([pos]);
          }
          pos = { x: this.position.x + i, y: this.position.y - 1 };
          if (this.isInPlatePosition(pos)) {
            branches.push([pos]);
          }
        }
        pos = { x: this.position.x + 1, y: this.position.y };
        if (this.isInPlatePosition(pos)) {
          branches.push([pos]);
        }
        pos = { x: this.position.x - 1, y: this.position.y };
        if (this.isInPlatePosition(pos)) {
          branches.push([pos]);
        }
        break;
      //#endregion
    }
    for (let i = 0; i < branches.length; i++) {
      branches[i] = branches[i].filter((position: { x: number; y: number }) =>
        this.isInPlatePosition(position)
      );
    }
    return branches;
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
