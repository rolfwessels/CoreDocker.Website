import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule} from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { of as observableOf } from 'rxjs/observable/of';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { DataModule } from './data/data.module';
import { AuthModule } from './auth/auth.module';
import { AnalyticsService } from './utils/analytics.service';
import { OAuth2PassAuthProvider } from './auth/oauth2.provider';
import { HttpResponse } from '@angular/common/http';
import { OAuth2Token, AccessToken } from './auth/oath2Token';
import { NotificationsService } from './utils/notifications.service';
import { ToasterModule } from 'angular2-toaster';

const socialLinks = [
  {
    url: 'https://github.com/rolfwessels/coredocker',
    target: '_blank',
    icon: 'socicon-github',
  },
  // {
  //   url: 'https://www.facebook.com/akveo/',
  //   target: '_blank',
  //   icon: 'socicon-facebook',
  // },
  // {
  //   url: 'https://twitter.com/akveo_inc',
  //   target: '_blank',
  //   icon: 'socicon-twitter',
  // },
];

const NB_CORE_PROVIDERS = [
  ...DataModule.forRoot().providers,
  ...AuthModule.forRoot().providers,
  ...NbAuthModule.forRoot({
    providers: {
      email: {
        service: OAuth2PassAuthProvider,
        config: {
          delay: 3000,
          baseEndpoint: 'http://localhost:5000',
          login: {
            rememberMe: true,
            endpoint: '/connect/token',
            clientId : 'coredocker.api',
            clientSecret : 'super_secure_password',
            grantType : 'password',
            scope : 'api',
          },
          token: {
            key : 'data.token',
            getter: (module: string, res: HttpResponse<Object>) => OAuth2Token.encodeAccessToken(<AccessToken>res.body),
          },
        },
      },
    },
    forms: {
      login: {
        redirectDelay: 500,
        socialLinks: socialLinks,
        rememberMe: false,
      },
      register: {
        socialLinks: socialLinks,
      },
    },
  }).providers,
  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: '*',
      },
      user: {
        parent: 'guest',
        create: '*',
        edit: '*',
        remove: '*',
      },
    },
  }).providers,
  {
    provide: NbRoleProvider,
    useValue: {
      getRole: () => {
        return observableOf('guest'); // here you could provide any role based on any auth flow
      },
    },
  },
  AnalyticsService,
  NotificationsService,
];

@NgModule({
  imports: [
    CommonModule,
    ToasterModule.forRoot(),
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
