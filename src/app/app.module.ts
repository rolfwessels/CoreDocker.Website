/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {ApolloModule, Apollo} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';

import { NgModule } from '@angular/core';
import { CoreModule } from './@core/core.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NB_AUTH_TOKEN_CLASS } from '@nebular/auth';
import { OAuth2Token } from './@core/auth/oath2Token';
import { OAuth2Interceptor } from './@core/data/auth/oauth2.interceptor';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { AppSettings } from './app.settings';



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ApolloModule,
    HttpLinkModule,

    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: NB_AUTH_TOKEN_CLASS, useValue: OAuth2Token },
    { provide: HTTP_INTERCEPTORS, useClass: OAuth2Interceptor, multi: true },
  ],
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      // By default, this client will send queries to the
      // `/graphql` endpoint on the same host
      link: httpLink.create({uri:  AppSettings.BuildUrl('/graphql')}),
      cache: new InMemoryCache(),
    });
  }
}
