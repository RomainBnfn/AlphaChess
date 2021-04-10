interface Position {
  x: number;
  y: number;
}

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

  public getMovablePosition(x: number, y: number) {}

  /**
   * @returns
   */
  public getPotentialMovableBranches() {
    let branches: Position[][] = [];
    let pos: Position;
    switch (this.categorie) {
      //#region Pawn
      case 'pawn':
        if (this.color == 'white') {
          pos = { x: this.position.x, y: this.position.y + 1 };
          if (this.isInPlatePosition(pos)) {
            branches.push([pos]);
          }
          if (this.position.y == 2) {
            pos = { x: this.position.x, y: this.position.y + 2 };
            if (this.isInPlatePosition(pos)) {
              branches.push([pos]);
            }
          }
        } else {
          pos = { x: this.position.x, y: this.position.y - 1 };
          if (this.isInPlatePosition(pos)) {
            branches.push([pos]);
          }
          if (this.position.y == 6) {
            pos = { x: this.position.x, y: this.position.y - 2 };
            if (this.isInPlatePosition(pos)) {
              branches.push([pos]);
            }
          }
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
        pos = { x: this.position.x + 1, y: this.position.y };
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
    for (let i = 1; i < 7; i++) {
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
