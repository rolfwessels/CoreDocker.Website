import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { User } from './user.model';
import { ApiService } from './api.service';
import { error } from 'selenium-webdriver';

import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

enum UserApiUrls {
  getAll = '/api/user',
  insert = '/api/user',
  getAllDetail = '/api/user/detail',
  getById = '/api/user/{id}',
  update = '/api/user/{id}',
  delete = '/api/user/{id}',
  getRoles = '/api/user/roles',
  register = '/api/user/register',
  forgotpassword = '/api/user/forgotpassword',
  whoami = '/api/user/whoami',
}

@Injectable()
export class UserService {
  private _prefix: string;

  constructor(private apiService: ApiService) {
    this._prefix = '/api/user';
  }

  getAll(): Observable<User> {
    throw new Error('not implementd');
  }

  getWhoami(): Observable<User> {
    const url = UserApiUrls.whoami;
    const result = this.apiService.get(url);
    return result;
  }

}

