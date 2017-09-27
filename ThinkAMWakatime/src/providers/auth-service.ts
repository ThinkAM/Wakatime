import { Http } from '@angular/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

import { User } from '../models/user';

import { Email } from '../utils/email';

@Injectable()
export class AuthService {

  constructor(private emailUtils : Email, 
              private http: Http){

  } 

  currentUser: User;

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Por favor, informe suas credenciais");
    } else {
      return this.http.post("http://thinkam.azurewebsites.net/api/login", credentials)
                .map(res => res.json())
                ._catch(error => Observable.throw(error.json()));
    }
  }

  public register(credentials) {
    if (credentials.name === null ||
        credentials.email === null || 
        credentials.password === null || 
        credentials.secretAPIKey === null) {
      return Observable.throw("Por favor informe todas as informações de registro.");
    } else {
      if (credentials.name.length < 3){
        return Observable.throw("Por favor informe um nome com no mínimo 3 caracteres.");
      }      
      if (!this.emailUtils.validateEmail(credentials.email)){
        return Observable.throw("Por favor informe um e-mail válido.");
      }      
      if (credentials.secretAPIKey.length < 8){
        return Observable.throw("Por favor informe uma secret API key com no mínimo 8 caracteres.");
      }

      return this.http.post("http://thinkam.azurewebsites.net/api/user", credentials)
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

