import { Component, OnInit } from '@angular/core';
import { Resource } from 'src/app/services/moduloDescargas/interface/resource';
import { ResourceService } from 'src/app/services/moduloDescargas/resource.service';
import { DownloadService } from 'src/app/services/moduloDescargas/download.service';
import { AuthService } from 'src/app/services/moduloUsuarios/auth.service';
@Component({
  selector: 'app-allresources',
  templateUrl: './allresources.component.html',
  styleUrls: ['./allresources.component.css'],
})
export class AllresourcesComponent implements OnInit {
  constructor(private resourceService: ResourceService, auth: AuthService, private downloadService:DownloadService) {
    auth.signedIn.subscribe((val) => {
      this.logged = val ? true : false;
    });
    this.ngOnInit()
  }
  data: Resource[] = [];
  private logged: boolean = false;

  ngOnInit(): void {
    this.getResources();
  }
  /**
   *Loads all the resources
   */
  getResources() {
    if (this.logged == true) {
     let promise= this.downloadService
        .getAllResources(this.logged)
        promise.then(value=>{this.data=value})
    } else {

      let promise= this.downloadService
        .getPlanResources(this.logged)
        promise.then(value=>{this.data=value})
    }

    
    }


}
