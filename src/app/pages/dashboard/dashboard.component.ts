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
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Query } from '@angular/compiler/src/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  users: Observable<LastUpdateModel[]>;
  usersCount: Observable<number>;
  projects: Observable<LastUpdateModel[]>;
  projectsCount: Observable<number>;
  hasValidToken: boolean;
  user: Observable<User>;

  constructor(
    private authService: NbAuthService,
    private userService: UserService,
    private projectService: ProjectService,
    apollo: Apollo,
  ) {

    const recentData = apollo.query({
        query: gql`
        {
          projects {
            recent(first:5){
              id,
              name,
              updateDate
            }
            query {
              count
            }
          }
          users {
            recent(first:5) {
              id,
              name,
              email,
              updateDate
            }
            query {
              count
            }
          }
        }`,
      });


    this.authService.onTokenChange()

      .subscribe((token: OAuth2Token) => {
        this.hasValidToken = token.isValid();
        if (this.hasValidToken) {
          this.user = this.userService.getWhoami();
          this.users = recentData
          .pipe(map(x => <User[]> (<any>x.data).users.recent))
          .map((users: User[]) => users.map(u => new LastUpdateModel(u.id, u.name, u.updateDate, u.email)));
          this.usersCount = recentData.pipe(map(x => <number> (<any>x.data).users.query.count));

          this.projects = recentData
          .pipe(map(x => <Project[]> (<any>x.data).projects.recent))
          .map((project: Project[]) => project.map(u => new LastUpdateModel(u.id, u.name, u.updateDate)));
          this.projectsCount = recentData.pipe(map(x => <number> (<any>x.data).projects.query.count));
        }
      });
  }


}
