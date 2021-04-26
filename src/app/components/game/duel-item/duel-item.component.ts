import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Opponent } from 'src/app/helpers/models/opponent';

@Component({
  selector: 'app-duel-item',
  templateUrl: './duel-item.component.html',
  styleUrls: ['./duel-item.component.scss'],
})
export class DuelItemComponent implements OnInit {
  @Input() duel: {
    opponent: Opponent;
    options: { isInfinite: boolean; time: number };
  } | null = null;
  @Output() reponseDuel = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  accepter() {
    this.reponseDuel.emit(true);
  }

  refuser() {
    this.reponseDuel.emit(false);
  }

  get pseudo() {
    return this.duel?.opponent.pseudo || '';
  }

  get firebaseUID() {
    return this.duel?.opponent.firebaseUID || '';
  }

  get options() {
    return this.duel?.options;
  }

  get isInfinite() {
    return this.options?.isInfinite || false;
  }

  get time() {
    return this.options?.time || 5;
  }
}
