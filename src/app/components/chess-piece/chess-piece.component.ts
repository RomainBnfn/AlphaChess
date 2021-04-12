import { Component, OnInit, Input } from '@angular/core';
import { ChessPiece } from 'src/app/helpers/models/chess-piece';

@Component({
  selector: 'app-chess-piece',
  templateUrl: './chess-piece.component.html',
  styleUrls: ['./chess-piece.component.scss'],
})
export class ChessPieceComponent implements OnInit {
  /*@Input() color: string = '';
  @Input() categorie: string = '';*/
  @Input() piece: ChessPiece | undefined;

  constructor() {}

  ngOnInit(): void {}

  svgUrl(): string {
    if (typeof this.piece == 'undefined') {
      return '';
    }
    return (
      '../../../assets/images/chessPack/' +
      this.piece?.color +
      '-' +
      this.piece?.categorie +
      '.svg'
    );
  }
}
