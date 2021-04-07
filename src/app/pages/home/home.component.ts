import { Component, OnInit } from '@angular/core';
import { IconButtonComponent } from '../../components/icon-button/icon-button.component';
import { ChessPlate } from '../../helpers/models/chess-plate';
import { ChessPiece } from 'src/app/helpers/models/chess-piece';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../../styles/global-style.css'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    let e = new ChessPiece(3, 3, 'black', 'bishop');
    console.log(e.getPotentialMovableBranches());
  }
}
