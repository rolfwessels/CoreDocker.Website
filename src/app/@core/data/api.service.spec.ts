import { TestBed, inject } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NbAuthService } from '@nebular/auth';
import { Observable } from 'rxjs/Observable';
import { OAuth2Token } from '../auth/oath2Token';
import 'rxjs/add/observable/of';

class MockNbAuthService  {
  public token = 'tokenxxxxxxxxxxxxxx;43200;bearer;981025260000';
  onTokenChange():  Observable<OAuth2Token> {
    const x = new OAuth2Token(this.token);
    return Observable.of(x);
  }

}

describe('ApiService', () => {
  const authService = new MockNbAuthService();
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ApiService,
        {provide: NbAuthService, useValue: authService},
      ],
    });
  });

  it('should be created', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));

});
