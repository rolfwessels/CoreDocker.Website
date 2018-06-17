import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from './users/users.service';
import { StateService } from './state.service';
import { AuthService } from './auth/auth.service';
import { ApiService } from './api.service';



const SERVICES = [
  UserService,
  StateService,
  AuthService,
  ApiService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class DataModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: DataModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
