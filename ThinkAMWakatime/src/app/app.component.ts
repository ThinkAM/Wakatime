import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import { DbProvider } from '../providers/db-provider';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private db: DbProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.db.get("user").then((user: any) => {
        if (user !== null && user.secretAPIKeyWakatime.length > 0) {
          this.rootPage = HomePage;
        } else {
          this.rootPage = LoginPage;
        }
      });
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

