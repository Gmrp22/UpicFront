import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DownloadService } from 'src/app/services/moduloDescargas/download.service';
import { Biblio } from 'src/app/services/moduloDescargas/interface/biblio';
import { AuthService } from 'src/app/services/moduloUsuarios/auth.service';
import { NotificationService } from 'src/app/services/notifications/notification.service';
@Component({
  selector: 'app-myresources',
  templateUrl: './myresources.component.html',
  styleUrls: ['./myresources.component.css']
})
export class MyresourcesComponent implements OnInit {
  public logedIn: Subscription;
  data: any = [];
  private logged: boolean = false;

constructor(
    auth: AuthService,
    private _sanitizer: DomSanitizer,
    private biblio:DownloadService,
    private notification: NotificationService,
    private router: Router,
  ) {
    this.logedIn = auth.signedIn.subscribe((val) => {
      this.logged = val ? true : false;

    });
  }

  ngOnInit(): void {    this.getResources();}

  ngOnDestroy(): void {
    this.logedIn.unsubscribe();
  }
  OnChanges(): void {
    if (!this.logged) {
      this.getResources();
    }
  }
  /**
   *Loads all the resources from the biblio
   */
   async getResources() {
     
    if (this.logged == true) {
      let promise = this.biblio.getMyUploadResource()
      promise.then((value) => {
        this.data = value;
        console.log(this.data,"-----")
      }).catch((err) => this.router.navigateByUrl('download/all-resource'))
    
      
    } 



    
  }
    /**
   *Decodes imgaes
   */
  decode(e: any) {
    let objectURL = 'data:image/jpeg;base64,' + e;
    let thumbnail = this._sanitizer.bypassSecurityTrustUrl(objectURL);
    return thumbnail;
  }



}