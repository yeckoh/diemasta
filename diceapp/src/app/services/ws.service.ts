import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as wsocket from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WsService {
  private sock: any;

  constructor() {
    this.connectToSocket();
  }

  // individual components listenfor whatever hooks they specify by calling this
  listenfor(eventName: string) {
    return new Observable((subscriber) => {
      this.sock.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }

  // individual components sendback whatever emitters they specify by calling this
  sendback(eventName: string, data: any) {
    this.sock.emit(eventName, data);
  }

  connectToSocket() {
    this.sock = wsocket('http://zmreborn-servers.xyz:7331');
    // if (localStorage.getItem('user') != null) {
    //   this.joinUserRoom();
    //   this.getUserCharacters();
    // }
  }

  disconnect() {
    this.sock.disconnect();
    sessionStorage.clear();
  }

}




