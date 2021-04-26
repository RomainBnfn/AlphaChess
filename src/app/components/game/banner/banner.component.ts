import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
  @Input() pseudo: string = '';
  @Input() time: string = '∞';
  @Input() isTurn: boolean = true;
  @Input() isMe: boolean = false;

  @Output() onGiveUp = new EventEmitter<null>();

  private isGivingUp: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  onClicOnGiveUpBtn() {
    this.isGivingUp = true;
  }

  onClicOnConfirmBtn() {
    this.onGiveUp.emit();
  }

  onClickOnCancelBtn() {
    this.isGivingUp = false;
  }

  get givingUp() {
    return this.isGivingUp;
  }
}
