import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { User } from '../models/user';

import { Email } from '../utils/email';

@Injectable()
export class AuthService {

 constructor(private emailUtils : Email){

  } 

  currentUser: User;

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Por favor, informe suas credenciais");
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
        let access = (credentials.password === "senha" && credentials.email === "email");
        this.currentUser = new User('Felipe Almeida', 'felipe.almeida@thinkam.net');
        observer.next(access);
        observer.complete();
      });
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
      // Aqui vamos chamar nosso backend mais pra frente!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
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

