import { Http, Headers, RequestOptions } from '@angular/http';

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

import { User } from '../models/user';

import { Email } from '../utils/email';
import { DbProvider } from './db-provider';

@Injectable()
export class AuthService {
  baseApiUrl: string = "http://connect.thinkam.net/api/";

  headers: Headers;
  options: RequestOptions;

  constructor(private emailUtils : Email,
              private http: Http,
              private dbProvider: DbProvider){

  }

  currentUser: User;

  public login(credentials) {
    if (credentials.userNameOrEmailAddress === null || credentials.password === null) {
      return Observable.throw("Por favor, informe suas credenciais");
    } else {
      return this.http.post(this.baseApiUrl + "TokenAuth/Authenticate", credentials)
                .map(res => res.json())
                ._catch(error => Observable.throw(error.json()));
    }
  }

  getUserById(id: number) {
    return new Promise((resolve: any, reject: any) => {
      this.dbProvider.get("authenticate").then((user: any) => {
        this.headers = new Headers({
          'Authorization': 'Bearer ' + user.accessToken
        });

        this.options = new RequestOptions({ headers: this.headers });

        this.http.get(this.baseApiUrl + "services/app/Account/Get?Id=" + id, this.options)
          .map(res => res.json())
          ._catch(error => reject(error.json()))
          .subscribe((res: any) => {
            resolve(res);
          });
      });
    });
  }

  public register(credentials) {
    if (credentials.name === null ||
        credentials.surname === null ||
        credentials.emailAddress === null ||
        credentials.password === null ||
        credentials.secretAPIKeyWakatime === null ||
        credentials.tenancyName === null) {
      return Observable.throw("Por favor informe todas as informações de registro.");
    } else {
      if (credentials.name.length < 3){
        return Observable.throw("Por favor informe um nome com no mínimo 3 caracteres.");
      }
      if (!this.emailUtils.validateEmail(credentials.emailAddress)){
        return Observable.throw("Por favor informe um e-mail válido.");
      }
      if (credentials.secretAPIKeyWakatime.length < 8){
        return Observable.throw("Por favor informe uma secret API key com no mínimo 8 caracteres.");
      }

      return this.http.post(this.baseApiUrl + "services/app/Account/Register", credentials)
                  .map(res => res.json())
                  ._catch(error => Observable.throw(error.json()));
    }
  }

  public getUserInfo(): User {
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}

