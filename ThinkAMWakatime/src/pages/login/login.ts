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
  registerCredentials = { userNameOrEmailAddress: '', password: '', tenancyName: 'Thinkers' };
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
      if (res.success) {
        this.db.set("authenticate", res.result);
        this.auth.getUserById(res.result.userId).then((response: any) => {
          if (response.success) {
            this.db.set("user", response.result);
            this.nav.setRoot(HomePage);
          } else {
            this.showError(res.error.message, res.error.details);
          }
        });
      } else {
        this.showError(res.error.message, res.error.details);
      }
    },
      error => {
        this.showError(error.message || "Erro", error.details);
      });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Por favor aguarde...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(title, text) {
    this.loading.dismiss();
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
}
