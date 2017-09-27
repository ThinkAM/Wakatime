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
  registerCredentials = { name: '', email: '', password: '', secretAPIKey: '' };
  
  constructor(private nav: NavController, 
              private auth: AuthService,
              private alertCtrl: AlertController, 
              private loadingCtrl: LoadingController) {
  }

  public register() {
    this.showLoading()
    this.auth.register(this.registerCredentials).subscribe(res => {
      if (res.ok) {
        this.loading.dismiss();
        this.createSuccess = res.ok;
        this.showPopup("Sucesso", "Conta Think A.M. Criada!");
      } else {
        this.loading.dismiss();
        this.showPopup("Erro", res.data);
      }
    },
      error => {
        this.loading.dismiss();
        this.showPopup("Erro", error);
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
