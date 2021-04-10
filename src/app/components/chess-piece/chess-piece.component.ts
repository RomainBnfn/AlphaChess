import { Component, OnInit, Input } from '@angular/core';
import { ChessPiece } from 'src/app/helpers/models/chess-piece';

@Component({
  selector: 'app-chess-piece',
  templateUrl: './chess-piece.component.html',
  styleUrls: ['./chess-piece.component.scss'],
})
export class ChessPieceComponent implements OnInit {
  @Input() color: string = '';
  @Input() categorie: string = '';
  @Input() x: number = 0;
  @Input() y: number = 0;

  private piece: ChessPiece | undefined;

  constructor() {}

  ngOnInit(): void {
    this.piece = new ChessPiece(this.x, this.y, this.color, this.categorie);
    console.log(this.x, this.y, this.color);
  }

  svgUrl(): string {
    if (this.piece == null) {
      throw new Error('No svg for an undefined piece.');
    }
    let color: string = this.piece.color;
    let categorie: string = this.piece.categorie;
    return (
      '../../../assets/images/chessPack/' + color + '-' + categorie + '.svg'
    );
  }
}
