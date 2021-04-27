import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Opponent } from 'src/app/helpers/models/opponent';
import { UserService } from 'src/app/helpers/services/user.service';

@Component({
  selector: 'app-opponent-item',
  templateUrl: './opponent-item.component.html',
  styleUrls: ['./opponent-item.component.scss'],
})
export class OpponentItemComponent implements OnInit {
  @Input() opponent: Opponent | null = null;
  @Input() isDueled: boolean = false;
  @Output() demandeDuel = new EventEmitter<null>();

  constructor(private _user: UserService) {}

  ngOnInit(): void {}

  defier() {
    this.demandeDuel.emit();
  }

  get pseudo() {
    return this.opponent?.pseudo || '';
  }

  get firebaseUID() {
    return this.opponent?.firebaseUID || '';
  }

  get isMe() {
    return this.firebaseUID == this._user.firebaseUID;
  }
}
