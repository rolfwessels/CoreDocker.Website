import { Component } from '@angular/core';
import { NbAuthService } from '@nebular/auth/services/auth.service';
import { OAuth2Token } from '../../@core/auth/oath2Token';
import { UserService } from '../../@core/data/users/users.service';
import { User, UserReferenceModel } from '../../@core/data/users/user.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty' ;
import { ProjectService } from '../../@core/data/projects/projects.service';
import { Project } from '../../@core/data/projects/project.model';
import { LastUpdateModel } from '../../@theme/components/last-updated/last-updated.component';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  users: Observable<LastUpdateModel[]>;
  projects: Observable<LastUpdateModel[]>;
  hasValidToken: boolean;
  user: Observable<User>;

  constructor(
    private authService: NbAuthService,
    private userService: UserService,
    private projectService: ProjectService,
  ) {
    this.authService.onTokenChange()
      .subscribe((token: OAuth2Token) => {
        this.hasValidToken = token.isValid();
        if (this.hasValidToken) {
          this.user = this.userService.getWhoami();
          this.users = this.userService.getAllDetail()
          .map((users: User[]) => users.map(u => new LastUpdateModel(u.id, u.name, u.updateDate, u.email)));

          this.projects = this.projectService.getAllDetail()
            .map((users: Project[]) => users.map(u => new LastUpdateModel(u.id, u.name, u.updateDate)));
        }
      });
  }


}
