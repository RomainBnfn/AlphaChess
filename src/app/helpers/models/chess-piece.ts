export class ChessPiece {
  x: number;
  y: number;
  categorie: string;
  hasMooved: boolean;
  color: string;

  constructor(x: number, y: number, color: string, chessCategorie: string) {
    this.x = x;
    this.y = y;
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
    let branches = new Array();
    switch (this.categorie) {
      case 'pawn':
        if (this.color == 'white') {
          branches.push([{ x: this.x, y: this.y + 1 }]);
        } else {
          branches.push([{ x: this.x, y: this.y - 1 }]);
        }
        break;
      case 'rook':
        branches = [[], [], [], []];
        for (let i = 1; i < 7; i++) {
          branches[0].push({ x: this.x + i, y: this.y });
          branches[1].push({ x: this.x - i, y: this.y });
          branches[2].push({ x: this.x, y: this.y + i });
          branches[3].push({ x: this.x, y: this.y - i });
        }
        break;
      case 'bishop':
        branches = [[], [], [], []];
        for (let i = 1; i < 7; i++) {
          branches[0].push({ x: this.x + i, y: this.y + i });
          branches[1].push({ x: this.x + i, y: this.y - i });
          branches[2].push({ x: this.x - i, y: this.y + i });
          branches[3].push({ x: this.x - i, y: this.y - i });
        }
        break;
    }
    branches.forEach((branche) => {
      branche = branche.filter((position: { x: number; y: number }) =>
        this.isInPlatePosition(position.x, position.y)
      );
    });
    return branches;
  }

  private isInPlatePosition(x: number, y: number): boolean {
    return x >= 0 && x <= 7 && y >= 0 && y <= 7;
  }
}
