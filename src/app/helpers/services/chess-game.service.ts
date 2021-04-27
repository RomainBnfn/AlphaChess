import { Injectable } from '@angular/core';
import { SocketIoService } from './socket-io.service';
import { Opponent, areEqualOpponents } from '../models/opponent';
import { ChessPlate } from '../models/chess-plate';
import { ChessPiece } from '../models/chess-piece';
import Position from '../models/position';

import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { Timer } from '../models/timer';

@Injectable({
  providedIn: 'root',
})
export class ChessGameService {
  opponents: Array<Opponent> = [];

  duelsReceived = new Map();
  duelsSent: Array<Opponent> = [];

  opponent: Opponent | null = null;
  myTurn: boolean = true;
  myTeam: string = 'white';
  chessPlate: ChessPlate = new ChessPlate();

  myTimer: Timer | null = null;
  opponentTimer: Timer | null = null;

  duelOptions = { isInfinite: false, time: 5 };

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
      let options = data.options;
      if (!this.duelsReceived.has(opponent.firebaseUID)) {
        this.duelsReceived.set(opponent.firebaseUID, {
          opponent: opponent,
          options: options,
        });
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

      let options = data.options;
      let time = options.isInfinite ? -1 : options.time;

      this.opponentTimer = new Timer(time, () => {});
      this.myTimer = new Timer(time, () => {
        this._socket.emit('timeout', {});
        // l'autre joueur abandonne
        Swal.fire('Vous avez perdu', "Vous n'aviez plus de temps!", 'error');
        this.finDePartie(true);
      });

      if (this.myTurn) {
        this.myTimer?.start();
      } else {
        this.opponentTimer?.start();
      }

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
      this.myTimer?.start();
      this.opponentTimer?.pause();
      this.myTurn = true;
    });

    _socket.listen('giveup').subscribe((data: any) => {
      // l'autre joueur abandonne
      if (this.isInGame) {
        Swal.fire(
          'Vous avez gagné',
          'Votre adversaire a abandonné !',
          'success'
        );
        this.finDePartie(true);
      }
    });

    _socket.listen('timeout').subscribe((data: any) => {
      // l'autre joueur abandonne
      Swal.fire(
        'Vous avez gagné',
        "Votre adversaire n'avait plus de temps !",
        'success'
      );
      this.finDePartie(true);
    });
  }

  updateOption(options: { isInfinite: boolean; time: number }) {
    this.duelOptions = options;
  }

  finDePartie(hideMessage: boolean) {
    if (!hideMessage) {
      let frenchName = this.winner == 'white' ? 'blancs' : 'noirs';
      Swal.fire(
        'Partie terminée',
        'Les ' + frenchName + ' ont gagné !',
        this.myTeam == this.winner ? 'success' : 'error'
      );
    }
    this.opponent = null;
    this.myTimer?.reset(-1);
    this.opponentTimer?.reset(-1);
    this.chessPlate = new ChessPlate();
  }

  //#region Demandes de duels

  demanderDuel(opponent: Opponent) {
    // Sinon, on le demande
    let res = this.duelsSent.filter((opponentConnu: Opponent) => {
      return opponent == opponentConnu;
    });
    if (res.length == 0) {
      this._socket.emit('demandeDuel', {
        opponent: opponent,
        options: this.duelOptions,
      });
      this.duelsSent.push(opponent);
    }
  }

  accepterDuel(opponent: Opponent) {
    let options = this.duelsReceived.get(opponent.firebaseUID).options;
    if (this.isInDuelReceived(opponent)) {
      this._socket.emit('accepterDuel', {
        opponent: opponent,
        options: options,
      });
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
    this.duelsReceived.delete(opponent.firebaseUID);
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
    return this.duelsReceived.has(opponent.firebaseUID);
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
    this.myTimer?.pause();
    this.opponentTimer?.start();
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

  public get myTime(): string {
    return this.myTimer?.time || '';
  }

  public get opponentTime(): string {
    return this.opponentTimer?.time || '';
  }

  //#endregion
}
