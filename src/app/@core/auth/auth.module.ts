import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OAuth2PassAuthProvider } from './oauth2.provider';


const Providers = [
  OAuth2PassAuthProvider,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ...Providers,
  ],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: AuthModule,
      providers: [
        ...Providers,
      ],
    };
  }
}
