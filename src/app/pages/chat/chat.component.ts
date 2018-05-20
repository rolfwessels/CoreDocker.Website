import { Component, OnInit } from '@angular/core';
import { HubConnectionBuilder, LogLevel, HubConnection } from '@aspnet/signalr';

@Component({
  selector: 'ngx-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  private connection: HubConnection;
  nick = 'Sample';
  message = '';
  messages: string[] = [];

  constructor() { }

  ngOnInit() {
    this.connection = new HubConnectionBuilder()
      .configureLogging(LogLevel.Trace)
      .withUrl('http://localhost:5000/chat')
      .build();
    this.connection.on('send', data => {
      console.log(data);
    });
    this.connection.onclose((e) => {
      console.log('Connection closed!', e);
    });
    console.log('Trying to connect to hub!');
    this.connection.start()
      .then(() => {
        console.log('Connection started!');
        this.connection.send('send', 'csad');
      })
      .catch(err => console.log('Error while establishing connection :(', err));

  }


}


