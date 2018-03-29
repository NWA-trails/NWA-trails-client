import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


export class Credentials {
  username: string;
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}

export class User {
  username: string;
}

@Injectable()
export class AuthenticationServiceProvider {
  currentUser: User;

  baseURL: string = "https://nwa-trails-webservice.herokuapp.com/user/";

  constructor(public http: HttpClient) {
    console.log('Hello AuthenticationServiceProvider Provider');
  }

  public login(credentials) {
    return this.http.post('https://nwa-trails-webservice.herokuapp.com/user/validate',credentials);
  }

}
