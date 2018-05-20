import { NbEmailPassAuthProvider, NbAuthResult } from '@nebular/auth';
import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpParams, HttpClient } from '@angular/common/http';


@Injectable()
export class OAuth2PassAuthProvider extends NbEmailPassAuthProvider {

  constructor(http: HttpClient, route: ActivatedRoute) {
    super(http, route);
  }

  authenticate(data?: any): Observable<NbAuthResult> {

    const clientId = this.getConfigValue('login.clientId');
    const clientSecret = this.getConfigValue('login.clientSecret');
    const grantType = this.getConfigValue('login.grantType');
    const scope = this.getConfigValue('login.scope');
    const body = new HttpParams()
      .set('client_id', clientId)
      .set('client_secret', clientSecret)
      .set('username', data.email)
      .set('password', data.password)
      .set('grant_type', grantType)
      .set('scope', scope);
    return super.authenticate(body);

  }

}
