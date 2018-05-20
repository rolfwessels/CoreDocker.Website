export class User {
  name:	string;
  email:	string;
  lastLoginDate:	Date;
  roles: string[];
  id:	string;
  updateDate:	Date;
  }

export class UserCreateUpdateModel {
  name: string;
  email: string;
  password: string;
}

export class UserReferenceModel {
  email: string;
  name: string;
  id: string;
}
