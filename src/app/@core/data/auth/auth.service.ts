import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

let counter = 0;

@Injectable()
export class AuthService {

  private auths = {
    nick: { name: 'Nick Jones', picture: 'assets/images/nick.png' },
    eva: { name: 'Eva Moor', picture: 'assets/images/eva.png' },
    jack: { name: 'Jack Williams', picture: 'assets/images/jack.png' },
    lee: { name: 'Lee Wong', picture: 'assets/images/lee.png' },
    alan: { name: 'Alan Thompson', picture: 'assets/images/alan.png' },
    kate: { name: 'Kate Martinez', picture: 'assets/images/kate.png' },
  };

  private authArray: any[];

  constructor() {
    // this.authArray = Object.values(this.auths);
  }

  getAuths(): Observable<any> {
    return Observable.of(this.auths);
  }

  getAuthArray(): Observable<any[]> {
    return Observable.of(this.authArray);
  }

  getAuth(): Observable<any> {
    counter = (counter + 1) % this.authArray.length;
    return Observable.of(this.authArray[counter]);
  }
}
