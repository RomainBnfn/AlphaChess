import { Injectable } from '@angular/core';

import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import { SocketIoService } from './socket-io.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _socket: SocketIoService) {}

  public initConnexion(pseudo: string) {
    firebase.auth().currentUser?.updateProfile({ displayName: pseudo });
    this._socket.emit('initConnexion', {
      pseudo: pseudo,
    });
  }

  public changeName(pseudo: string) {
    firebase.auth().currentUser?.updateProfile({ displayName: pseudo });
    this._socket.emit('changePseudo', {
      pseudo: pseudo,
    });
  }

  signOut() {
    this._socket.disconnect();
  }

  // ----------------------- Getters ----------------------

  get firebaseUID(): string {
    return firebase.auth().currentUser?.uid || '';
  }

  get displayName(): string {
    return firebase.auth().currentUser?.displayName || '';
  }

  get photoURL(): string {
    return firebase.auth().currentUser?.photoURL || '';
  }

  get email(): string {
    return firebase.auth().currentUser?.email || '';
  }
}
