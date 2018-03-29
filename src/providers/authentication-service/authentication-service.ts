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

@Injectable()
export class AuthenticationServiceProvider {

  baseURL: string = "https://nwa-trails-webservice.herokuapp.com/user/";

  constructor(public http: HttpClient) {
    console.log('Hello AuthenticationServiceProvider Provider');
  }

  public login(credentials) {
    this.http.get('https://nwa-trails-webservice.herokuapp.com/user/').subscribe(
      response => {
        console.log(response);
      }
    );
  }

}
