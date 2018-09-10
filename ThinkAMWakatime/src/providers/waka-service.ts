import { Http, Headers, RequestOptions } from '@angular/http';

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { DbProvider } from './db-provider';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class WakaService {
  baseApiUrl: string = "https://wakatime.com/api/v1/";

  headers: Headers;
  options: RequestOptions;

  constructor(private http: Http,
    private dbProvider: DbProvider) {

  }

  getCurrentUser() {
    return new Promise((resolve: any, reject: any) => {
      this.dbProvider.get("user").then((user: any) => {
        this.headers = new Headers({
          'Authorization': 'Basic ' + btoa(user.secretAPIKeyWakatime)
        });

        this.options = new RequestOptions({ headers: this.headers });

        this.http.get(this.baseApiUrl + "users/current", this.options)
          .map(res => res.json())
          ._catch(error => reject(error.json()))
          .subscribe((res: any) => {
            resolve(res.data);
          });
      });
    });
  }

  getProjectsCurrentUser() {
    return new Promise((resolve: any, reject: any) => {
      this.dbProvider.get("user").then((user: any) => {
        this.headers = new Headers({
          'Authorization': 'Basic ' + btoa(user.secretAPIKeyWakatime)
        });

        this.options = new RequestOptions({ headers: this.headers });

        this.http.get(this.baseApiUrl + "users/current/projects", this.options)
          .map(res => res.json())
          ._catch(error => reject(error.json()))
          .subscribe((res: any) => {
            resolve(res.data);
          });
      });
    });
  }
}
