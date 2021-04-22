import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class SocketIoService {
  socket: any;

  constructor() {
    this.socket = io(environment.ws_url);
    this.listen('close').subscribe((_) => {
      this.disconnect();
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
    data = { ...data, firebaseUID: firebase.auth().currentUser?.uid };
    this.socket.emit(eventName, data);
  }

  public get isConnected() {
    return this.socket.connected;
  }

  disconnect() {
    this.socket.disconnect();
  }
}
