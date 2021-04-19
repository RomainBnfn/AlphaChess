import { Injectable } from '@angular/core';
import { SocketIoService } from './socket-io.service';

@Injectable({
  providedIn: 'root',
})
export class ChessGameService extends SocketIoService {
  constructor() {
    super();
  }

  public pseudoResponse = false;
  public pseudo = '';
  askForPseudo(pseudo: string) {
    this.emit('askForPseudo', { pseudo: pseudo });
    this.listen('pseudoResponse').subscribe((data: any) => {
      this.pseudoResponse = data.response;
      if (this.pseudoResponse) {
        this.pseudo = pseudo;
      }
    });
  }
}
