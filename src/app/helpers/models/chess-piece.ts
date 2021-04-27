import Position, { areEqualPositions } from './position';
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

  /**
   * Retourne tous les positions déplaçable pour une pièce
   * @param plate Le plateau de jeu
   * @returns Le liste des positions déplaçables pour une pièce
   */
  public getMovablePositions(plate: ChessPlate): Position[] {
    let potentialPos = this.getPotentialMovablePositions(plate);
    // ATTENTION : PAS ROI EN ECHEC
    potentialPos = potentialPos.filter((pos: Position) => {
      // Si la pièce bouge ici, le roi n'est pas en échec
      return !plate.estEnEchecApresMouvement(this.color, this, pos);
    });
    return potentialPos;
  }

  /**
   *  Retourne la liste des mouvements potentiels possibles (sans ternir compte du roi)
   * @param plate Le plateau de jeu
   * @returns Le liste des positions potentielement déplaçables pour une pièce
   */
  private getPotentialMovablePositions(plate: ChessPlate): Position[] {
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
        // Rocks
        if (!this.hasMooved) {
          let y = this.position.y;
          let potentialRooks = [plate.getPiece(0, y), plate.getPiece(7, y)];
          let otherTeam = this.color == 'white' ? 'black' : 'white';
          let defendedPositionByOpponent = plate
            .getDefendedPosition(otherTeam)
            .filter((pos: Position) => {
              return pos.y == y;
            });
          // Charge les cases menacées par l'équipe adverse,
          // en ne gardant que la ligne du rock (qui nous intéresse)
          potentialRooks.forEach((rook: ChessPiece | undefined) => {
            if (
              rook != undefined &&
              rook.categorie == 'rook' &&
              !rook.hasMooved
            ) {
              // Si c'est une tour
              let rookX = rook.position.x;
              let min = Math.min(rookX, this.position.x);
              let max = Math.max(rookX, this.position.x);
              let isSmallRock = rookX == min;
              // Small rock or big rock
              let direction = isSmallRock ? -1 : 1;
              let canRock: boolean = true;
              for (let i = min + 1; i <= max - 1; i++) {
                if (plate.getPiece(i, y) != undefined) canRock = false; // Cases non vides
              }
              defendedPositionByOpponent.forEach((pos: Position) => {
                if (areEqualPositions(pos, { x: this.position.x, y: y }))
                  canRock = false;
                if (
                  areEqualPositions(pos, {
                    x: this.position.x + direction,
                    y: y,
                  })
                )
                  canRock = false;
                if (
                  areEqualPositions(pos, {
                    x: this.position.x + 2 * direction,
                    y: y,
                  })
                )
                  canRock = false;
              });
              if (canRock)
                movablePositions.push({
                  x: this.position.x + 2 * direction,
                  y: y,
                });
            }
          });
        }
        break;
      //#endregion
    }
    return movablePositions;
  }

  /**
   *  Retourne la liste des positions défendues (attaquables) par une pièce
   * @param plate Le plateau de jeu
   * @returns La liste des positions défendues par une pièce
   */
  public getDefendedPosition(plate: ChessPlate): Position[] {
    let movablePositions = [];
    if (this.categorie == 'king') {
      for (let i = -1; i <= 1; i++) {
        movablePositions.push({
          x: this.position.x + i,
          y: this.position.y + 1,
        });
        movablePositions.push({
          x: this.position.x + i,
          y: this.position.y - 1,
        });
      }
      movablePositions.push({ x: this.position.x + 1, y: this.position.y });
      movablePositions.push({ x: this.position.x - 1, y: this.position.y });
      movablePositions.forEach((pos: Position) => {
        if (this.isInPlatePosition(pos) && !plate.areSameTeam(this, pos)) {
          movablePositions.push(pos);
        }
      });
      return movablePositions;
    }
    movablePositions = this.getPotentialMovablePositions(plate);
    let pos: Position;
    if (this.categorie == 'pawn') {
      movablePositions = movablePositions.filter((pos: Position) => {
        return pos.x != this.position.x;
      });
    }
    return movablePositions;
  }

  private isInPlatePosition(position: Position): boolean {
    return (
      position.x >= 0 && position.x <= 7 && position.y >= 0 && position.y <= 7
    );
  }

  /**
   *  Permet d'obtenir une liste de position dans le plateau en oppérant 8 fois l'opération op.
   * @param op Opération à répéter
   * @param branches Les branches actuelles
   */
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

  /**
   *  Permet d'obtenir les 4 branches diagonales à partir d'une position
   * @param x Le x de la pos
   * @param y Le y de la pos
   * @returns Les branches diagonales
   */
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

  /**
   *  Permet d'obtenir les 4 branches rectilignes à partir d'une position
   * @param x Le x de la pos
   * @param y Le y de la pos
   * @returns Les branches rectilignes
   */
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
