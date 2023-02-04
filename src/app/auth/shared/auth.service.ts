import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { SignupRequestPayload } from '../sign-up/signup-request.payload';
import { map, Observable, tap } from 'rxjs';
import { LoginRequestPayload } from '../login/login-request.payload';
import { LoginResponsePayload } from '../login/login-response.payload';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUrl = 'http://localhost:8080/api/auth/';

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) { }

  signup(signupRequestPayload: SignupRequestPayload): Observable<any>{
    return this.httpClient.post(this.authUrl+'signup',signupRequestPayload, { responseType: 'text' });
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient.post<LoginResponsePayload>(this.authUrl+'login',loginRequestPayload).pipe( map (data=> {
      this.localStorage.store('authenticationToken', data.authenticationToken);
      this.localStorage.store('username',data.username);
      this.localStorage.store('refreshToken',data.refreshToken);
      this.localStorage.store('expirationTime',data.expirationTime);

      return true;
    }))
  }
  
  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }

  refreshToken() {
    const refreshTokenPayload = {
      refreshToken: this.getRefreshToken(),
      username: this.getUsername()
    }
    return this.httpClient.post<LoginResponsePayload>(this.authUrl+'refresh/token', refreshTokenPayload).pipe(tap(response => {
      this.localStorage.store('authenticationToken', response.authenticationToken);
      this.localStorage.store('expirationTime',response.expirationTime);
    }))
  }

  getUsername(){
    return this.localStorage.retrieve('username');
  }
  getRefreshToken(){
    return this.localStorage.retrieve('refreshToken');
  }
  getExpirationTime(){
    this.localStorage.retrieve('expirationTime');
  }

  isLoggedIn(): boolean{
    return this.getJwtToken != null;
  }

}
