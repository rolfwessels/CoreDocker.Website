import { Component, OnInit } from '@angular/core';
import { HubConnectionBuilder, LogLevel, HubConnection, JsonHubProtocol } from '@aspnet/signalr';
import { AppSettings } from '../../app.settings';

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
    Object.defineProperty(WebSocket, 'OPEN', {
      value: 1,
    });
    const protocol = new JsonHubProtocol();
    this.connection = new HubConnectionBuilder()
      .configureLogging(LogLevel.Trace)
      .withUrl(AppSettings.BuildUrl('/chat'))
      .withHubProtocol(protocol)
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


