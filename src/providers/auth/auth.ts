import {Injectable} from "@angular/core";
import {tap} from 'rxjs/operators/tap';
import {ReplaySubject, Observable} from "rxjs";
import {Storage} from "@ionic/storage";
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable()
export class AuthProvider {
  private jwtTokenName = 'jwt_token';

  authUser = new ReplaySubject<any>(1);

  constructor(private readonly httpClient: HttpClient,
              private readonly storage: Storage,
              private readonly jwtHelper: JwtHelperService) {
  }

  checkLogin() {
    this.storage.get(this.jwtTokenName).then(jwt => {
      if (jwt && !this.jwtHelper.isTokenExpired(jwt)) {
        this.httpClient.get('https://nwa-trails-webservice.herokuapp.com/user/authenticate')
          .subscribe(() => this.authUser.next(jwt),
            (err) => this.storage.remove(this.jwtTokenName).then(() => this.authUser.next(null)));
        // OR
        // this.authUser.next(jwt);
      }
      else {
        this.storage.remove(this.jwtTokenName).then(() => this.authUser.next(null));
      }
    });
  }

  login(credentials): Observable<any> {
    return this.httpClient.post('https://nwa-trails-webservice.herokuapp.com/user/login', credentials)
      .pipe(tap(jwt => this.handleJwtResponse(jwt)));
  }

  logout() {
    this.storage.remove(this.jwtTokenName).then(() => this.authUser.next(null));
  }

  signup(values: any): Observable<any> {
    return this.httpClient.post('https://nwa-trails-webservice.herokuapp.com/user/signup', values, {responseType: 'text'})
      .pipe(tap(jwt => {
        if (jwt !== 'EXISTS') {
          return this.handleJwtResponse(jwt);
        }
        return jwt;
      }));
  }

  private handleJwtResponse(jwt: string) {
    return this.storage.set(this.jwtTokenName, jwt)
      .then(() => this.authUser.next(jwt))
      .then(() => jwt);
  }

}