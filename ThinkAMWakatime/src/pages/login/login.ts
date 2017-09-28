import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';
import { DbProvider } from '../../providers/db-provider';

import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { email: '', password: '' };
  constructor(private nav: NavController, 
              private auth: AuthService, 
              private db: DbProvider,
              private alertCtrl: AlertController, 
              private loadingCtrl: LoadingController) {
  }

  public createAccount() {
    this.nav.push(RegisterPage);
  }

  public login() {
    this.showLoading()
    this.auth.login(this.registerCredentials).subscribe(res => {
      if (res.ok) {
        this.db.set("user", res.data);
        this.nav.setRoot(HomePage);
      } else {
        this.showError(res.data);
      }
    },
      error => {
        this.showError(error);
      });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Por favor aguarde...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();
    let alert = this.alertCtrl.create({
      title: 'Falha ao Entrar',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
}