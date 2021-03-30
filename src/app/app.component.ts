import { Component } from '@angular/core';

import { FooterComponent } from './components/footer/footer.component';

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'AlphaChess';

  constructor() {
    var firebaseConfig = {
      apiKey: 'AIzaSyCWnTQVjH88IuDEQHia3Ybdxm5qedelrGE',
      authDomain: 'alphachess-8211b.firebaseapp.com',
      projectId: 'alphachess-8211b',
      storageBucket: 'alphachess-8211b.appspot.com',
      messagingSenderId: '1090828752721',
      appId: '1:1090828752721:web:79d4588743f1bc84a2e570',
      measurementId: 'G-FV5JWQ3C14',
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }
}
