import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  loading: Loading;
  createSuccess = false;
  registerCredentials = { name: '', surname: '', userName: '', emailAddress: '', password: '', secretAPIKeyWakatime: '', tenancyName: 'Thinkers' };

  constructor(private nav: NavController,
              private auth: AuthService,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController) {
  }

  public register() {
    this.showLoading()
    this.auth.register(this.registerCredentials).subscribe(res => {
      if (res.success) {
        this.loading.dismiss();
        this.createSuccess = res.success;
        this.showPopup("Sucesso", "Conta Think A.M. Criada!");
      } else {
        this.loading.dismiss();
        this.showPopup("Erro", res.error.message);
      }
    },
      error => {
        this.loading.dismiss();
        this.showPopup(error.message || "Erro", error.details);
      });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Por favor aguarde...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }
}
