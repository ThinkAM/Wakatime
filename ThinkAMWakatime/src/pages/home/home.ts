import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { ProjectPage } from '../project/project';

import { WakaService } from '../../providers/waka-service';

import { Date } from '../../utils/date';

import { CurrentUser } from '../../models/current-user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  currentUser: CurrentUser = new CurrentUser();

  constructor(private wakaService: WakaService,
    private nav: NavController,
    private dateUtils: Date) {
    this.wakaService.getCurrentUser().then((currentUser: any) => {
      console.log(currentUser);
      currentUser.created_at = this.dateUtils.format(currentUser.created_at);
      this.currentUser = currentUser;
    })
  }

  public project() {
    this.nav.push(ProjectPage);
  }  
}
