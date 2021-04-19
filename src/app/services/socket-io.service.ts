import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketIoService {
  socket: Socket;
  public isConnected: boolean;

  constructor() {
    this.socket = io(environment.ws_url);
    this.isConnected = false;
    this.listen('connected').subscribe((data) => {
      this.isConnected = true;
    });
  }

  listen(eventName: string) {
    return new Observable((observer) => {
      this.socket.on(eventName, (data: any) => {
        observer.next(data);
      });
    });
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
}
