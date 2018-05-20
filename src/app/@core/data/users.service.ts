import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User, UserCreateUpdateModel, UserReferenceModel } from './user.model';
import { ApiService } from './api.service';
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

  getAll(): Observable<UserReferenceModel[]> {
    const result = this.apiService.get(UserApiUrls.getAll);
    return result;
  }

  insert(): Observable<User> {
    const result = this.apiService.get(UserApiUrls.insert);
    // todo !!!
    return result;
  }

  getAllDetail(): Observable<User[]> {
    const result = this.apiService.get(UserApiUrls.getAllDetail);
    // todo !!!
    return result;
  }

  getById(): Observable<User> {
    const result = this.apiService.get(UserApiUrls.getById);
    // todo !!!
    return result;
  }

  update(id: string, user: UserCreateUpdateModel): Observable<User> {
    const result = this.apiService.get(UserApiUrls.update);
    // todo !!!
    return result;
  }

  delete(id): Observable<User> {
    const result = this.apiService.get(UserApiUrls.delete);
    // todo !!!
    return result;
  }

  getRoles(): Observable<string[]> {
    const result = this.apiService.get(UserApiUrls.getRoles);
    // todo !!!
    return result;
  }

  register(user: UserCreateUpdateModel): Observable<User> {
    const result = this.apiService.get(UserApiUrls.register);
    // todo !!!
    return result;
  }

  forgotpassword(): Observable<User> {
    const result = this.apiService.get(UserApiUrls.forgotpassword);
    // todo !!!
    return result;
  }

  getWhoami(): Observable<User> {
    const result = this.apiService.get(UserApiUrls.whoami);
    return result;
  }

}

