import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { NbAuthService } from '@nebular/auth';
import { OAuth2Token, AccessTokenWithExpireDate } from '../auth/oath2Token';
@Injectable()
export class OAuth2Interceptor implements HttpInterceptor {

  token: AccessTokenWithExpireDate;
  constructor(private authService: NbAuthService) {
    this.authService.onTokenChange()
    .subscribe((token: OAuth2Token) => {
      this.token = token.isValid() ? token.accessToken : null;
    });
  }

  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.token != null) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', this.token.token_type + ' ' + this.token.access_token ),
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
