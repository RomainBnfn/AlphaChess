import { Injectable } from '@angular/core';
import { SocketIoService } from './socket-io.service';
import { Opponent, areEqualOpponents } from '../helpers/models/opponent';
import { ChessPlate } from '../helpers/models/chess-plate';
import { ChessPiece } from '../helpers/models/chess-piece';
import Position from '../helpers/models/position';

import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ChessGameService {
  opponents: Array<Opponent> = [];

  duelsReceived: Array<Opponent> = [];
  duelsSent: Array<Opponent> = [];

  opponent: Opponent | null = null;
  myTurn: boolean = true;
  myTeam: string = 'white';
  chessPlate: ChessPlate = new ChessPlate();

  constructor(private _socket: SocketIoService) {
    _socket.listen('listOpponent').subscribe((data: any) => {
      this.opponents = data.opponents;
    });

    _socket.listen('newConnexion').subscribe((data: any) => {
      let opponent = data.opponent;
      if (!this.isInOpponents(opponent)) {
        this.opponents.push(opponent);
      }
    });

    _socket.listen('newDisconnexion').subscribe((data: any) => {
      let opponent = data.opponent;
      if (this.isInOpponents(opponent)) {
        this.removeOpponentDuelReceived(opponent);
        this.removeOpponentDuelSent(opponent);
        this.removeOpponents(opponent);
        if (opponent.firebaseUID == this.opponent?.firebaseUID) {
          this.opponent = null;
        }
      }
    });

    _socket.listen('changePseudo').subscribe((data: any) => {});

    //#region Duels
    _socket.listen('demandeDuel').subscribe((data: any) => {
      let opponent: Opponent = data.opponent;

      let res = this.duelsReceived.filter((opponentConnu: Opponent) => {
        return opponent.firebaseUID == opponentConnu.firebaseUID;
      });
      if (res.length == 0) {
        this.duelsReceived.push(opponent);
      }
    });

    _socket.listen('refusDuel').subscribe((data: any) => {
      let opponent: Opponent = data.opponent;
      this.removeOpponentDuelSent(opponent);
    });

    _socket.listen('acceptationDuel').subscribe((data: any) => {
      let opponent = data.opponent;
      this.declancherDuel(opponent);
    });
    //#endregion

    _socket.listen('startGame').subscribe((data: any) => {
      this.myTurn = data.myTurn;
      this.myTeam = this.myTurn ? 'white' : 'black';
      this.chessPlate = new ChessPlate();
    });

    _socket.listen('turn').subscribe((data: any) => {
      let piece = data.piece;
      let pos = data.pos;
      let realPiece = this.chessPlate.getPiece(
        piece.position.x,
        piece.position.y
      );
      if (realPiece) {
        this.chessPlate.movePiece(realPiece, pos);
      }
      if (this.winner) {
        this.finDePartie(false);
        return;
      }
      this.myTurn = true;
    });

    _socket.listen('giveup').subscribe((data: any) => {
      // l'autre joueur abandonne
      Swal.fire('Vous avez gagné', 'Votre adversaire a abandonné !', 'success');
      this.finDePartie(true);
    });
  }

  finDePartie(isGiveUp: boolean) {
    if (!isGiveUp) {
      let frenchName = this.winner == 'white' ? 'blancs' : 'noirs';
      Swal.fire(
        'Partie terminée',
        'Les ' + frenchName + ' ont gagné !',
        this.myTeam == this.winner ? 'success' : 'error'
      );
    }
    this.opponent = null;
    this.chessPlate = new ChessPlate();
  }

  //#region Demandes de duels

  demanderDuel(opponent: Opponent) {
    // Si on a déjà été demandé en duel par cet opponent
    if (this.isInDuelReceived(opponent)) {
      this.accepterDuel(opponent);
      return;
    }
    // Sinon, on le demande
    let res = this.duelsSent.filter((opponentConnu: Opponent) => {
      return opponent == opponentConnu;
    });
    if (res.length == 0) {
      this._socket.emit('demandeDuel', { opponent: opponent });
      this.duelsSent.push(opponent);
    }
  }

  accepterDuel(opponent: Opponent) {
    if (this.isInDuelReceived(opponent)) {
      this._socket.emit('accepterDuel', { opponent: opponent });
      this.declancherDuel(opponent);
    }
  }

  declancherDuel(opponent: Opponent) {
    this.removeOpponentDuelReceived(opponent);
    this.removeOpponentDuelSent(opponent);
    this.opponent = opponent;
  }

  refuserDuel(opponent: Opponent) {
    this._socket.emit('refuserDuel', { opponent: opponent });
    this.removeOpponentDuelReceived(opponent);
  }
  //#endregion

  //#region Fnct sur les listes
  removeOpponentDuelReceived(opponent: Opponent) {
    this.duelsReceived = this.duelsReceived.filter(
      (opponentBis) => !areEqualOpponents(opponent, opponentBis)
    );
  }

  removeOpponentDuelSent(opponent: Opponent) {
    this.duelsSent = this.duelsSent.filter(
      (opponentBis) => !areEqualOpponents(opponent, opponentBis)
    );
  }

  removeOpponents(opponent: Opponent) {
    this.opponents = this.opponents.filter(
      (opponentBis) => !areEqualOpponents(opponent, opponentBis)
    );
  }

  isInDuelSent(opponent: Opponent) {
    return (
      this.duelsSent.filter((opponentBis) =>
        areEqualOpponents(opponent, opponentBis)
      ).length == 1
    );
  }

  isInDuelReceived(opponent: Opponent) {
    return (
      this.duelsReceived.filter((opponentBis) =>
        areEqualOpponents(opponent, opponentBis)
      ).length == 1
    );
  }

  isInOpponents(opponent: Opponent) {
    return (
      this.opponents.filter((opponentBis) =>
        areEqualOpponents(opponent, opponentBis)
      ).length == 1
    );
  }

  //#endregion

  //#region Jeu
  turn(piece: ChessPiece, pos: Position) {
    this._socket.emit('turn', { piece: piece, pos: pos });
    this.chessPlate.movePiece(piece, pos);
    this.myTurn = !this.myTurn;
    if (this.winner) {
      this.finDePartie(false);
    }
  }

  giveUp() {
    this._socket.emit('giveup', {});
    // l'autre joueur abandonne
    Swal.fire('Vous avez perdu', 'Vous avez abandonné !', 'error');
    this.finDePartie(true);
  }

  //#endregion

  //#region Getters
  public get isConnected() {
    return this._socket.isConnected;
  }

  public get isInGame() {
    return this.opponent !== null;
  }

  public get winner() {
    return this.chessPlate.winner;
  }
  //#endregion
}
