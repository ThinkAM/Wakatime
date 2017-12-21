import { Component } from '@angular/core';

import { WakaService } from '../../providers/waka-service';

@Component({
  selector: 'page-project',
  templateUrl: 'project.html',
})
export class ProjectPage {

  projects: any[] = [];

  constructor(private wakaService: WakaService) {
    this.wakaService.getProjectsCurrentUser().then((projects: any[]) => {
      console.log(projects);
      this.projects = projects;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Project');
  }


}
