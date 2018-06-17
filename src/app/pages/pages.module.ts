import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { ChatComponent } from './chat/chat.component';
import { ProjectComponent } from './project/project.component';
import { UserComponent } from './user/user.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';

const PAGES_COMPONENTS = [
  PagesComponent,
  ChatComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    Ng2SmartTableModule,
    ToasterModule,
  ],

  declarations: [
    ...PAGES_COMPONENTS,
    UserComponent,
    ProjectComponent,
  ],
  providers: [
  ],
})
export class PagesModule {
}
