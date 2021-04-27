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

  ngAfterViewInit(): void {
    this.onResize('');
  }

  onResize(event: any) {
    let width = window.innerWidth;
    let height = window.innerHeight - 180 - 120;
    let size = Math.min(width, height);

    let bandeau = document.getElementById(this.id);
    bandeau?.style.setProperty('width', size + 'px');
  }

  onClicOnGiveUpBtn() {
    this.isGivingUp = true;
  }
  onClicOnConfirmBtn() {
    this.onGiveUp.emit();
  }

  onClickOnCancelBtn() {
    this.isGivingUp = false;
  }

  get id(): string {
    return 'bandeau' + this.isMe;
  }

  get givingUp() {
    return this.isGivingUp;
  }

  get message(): string {
    return this.isMe ? 'A vous de jouer !' : 'Votre adversaire joue...';
  }
}
