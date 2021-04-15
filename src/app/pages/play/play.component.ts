import { Component, OnInit } from '@angular/core';
import { SocketIoService } from 'src/app/services/socket-io.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss', '../../styles/global-style.css'],
})
export class PlayComponent implements OnInit {
  constructor(private _socketService: SocketIoService) {
    this._socketService.listen('test').subscribe((data) => {
      console.log('');
      console.log(data);
    });
    this._socketService.listen('message').subscribe((data) => {
      console.log('Message :');
      console.log(data);
    });
  }

  ngOnInit() {}

  btnClicked() {}
}
