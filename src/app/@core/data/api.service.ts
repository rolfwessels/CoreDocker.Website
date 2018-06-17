import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { NbAuthService } from '@nebular/auth/services';
import { OAuth2Token, AccessTokenWithExpireDate } from '../auth/oath2Token';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService {
  token: AccessTokenWithExpireDate;
  hasValidToken: boolean;
  _location: string;

  constructor(
    private http: HttpClient,
    private authService: NbAuthService,
  ) {
    this._location = 'http://localhost:5000';
    this.authService.onTokenChange()
      .subscribe((token: OAuth2Token) => {
        this.hasValidToken = token.isValid();
        this.token = this.hasValidToken ? token.accessToken : null;
      });

  }

  get(path: string): Observable<any> {
    const uri = Location.joinWithSlash(this._location, path);
    return this.http.get(uri);
  }

  post(path: string, data: any): Observable<any> {
    const uri = Location.joinWithSlash(this._location, path);
    return this.http.post(uri, data);
  }

  put(path: string, data: any): Observable<any> {
    const uri = Location.joinWithSlash(this._location, path);
    return this.http.put(uri, data);
  }

  delete(path: string): Observable<any> {
    const uri = Location.joinWithSlash(this._location, path);
    return this.http.delete(uri);
  }
}

