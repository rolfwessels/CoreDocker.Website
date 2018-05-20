import { Component } from '@angular/core';
import { NbAuthService } from '@nebular/auth/services/auth.service';
import { OAuth2Token } from '../../@core/auth/oath2Token';
import { UserService } from '../../@core/data/users.service';
import { User, UserReferenceModel } from '../../@core/data/user.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty' ;

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  users: Observable<UserReferenceModel[]>;
  hasValidToken: boolean;
  user: Observable<User>;

  constructor(
    private authService: NbAuthService,
    private userService: UserService,
  ) {
    this.authService.onTokenChange()
      .subscribe((token: OAuth2Token) => {
        this.hasValidToken = token.isValid();
        if (this.hasValidToken) {
          this.user = this.userService.getWhoami();
          this.users = this.userService.getAll();
        }
      });
  }


}
