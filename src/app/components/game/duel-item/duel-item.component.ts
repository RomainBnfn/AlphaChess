import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Opponent } from 'src/app/helpers/models/opponent';

@Component({
  selector: 'app-duel-item',
  templateUrl: './duel-item.component.html',
  styleUrls: ['./duel-item.component.scss'],
})
export class DuelItemComponent implements OnInit {
  @Input() duel: Opponent | null = null;
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
    return this.duel?.pseudo || '';
  }

  get firebaseUID() {
    return this.duel?.firebaseUID || '';
  }
}
