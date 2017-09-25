import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  createSuccess = false;
  registerCredentials = { name: '', email: '', password: '', secretAPIKey: '' };
  
  constructor(private nav: NavController, private auth: AuthService,
    private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
  }

  public register() {
    this.auth.register(this.registerCredentials).subscribe(success => {
      if (success) {
        this.createSuccess = true;
        this.showPopup("Sucesso", "Conta Think A.M. Criada!");
      } else {
        this.showPopup("Erro", "Ocorreu um problema na criação da conta.");
      }
    },
      error => {
        this.showPopup("Erro", error);
      });
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
