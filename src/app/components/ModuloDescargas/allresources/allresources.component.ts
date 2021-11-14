import { Component, OnInit, OnChanges, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  gResource,
  Resource,
} from 'src/app/services/moduloDescargas/interface/resource';
import { ResourceService } from 'src/app/services/moduloDescargas/resource.service';
import { DownloadService } from 'src/app/services/moduloDescargas/download.service';
import { AuthService } from 'src/app/services/moduloUsuarios/auth.service';
import { BiblioService } from 'src/app/services/moduloDescargas/biblio/biblio.service';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-allresources',
  templateUrl: './allresources.component.html',
  styleUrls: ['./allresources.component.css'],
})
export class AllresourcesComponent implements OnInit {
  public logedIn: Subscription;
  data: gResource[] = [];
  private logged: boolean = false;

  constructor(
    private resourceService: ResourceService,
    auth: AuthService,
    private downloadService: DownloadService,
    private _sanitizer: DomSanitizer,
    public dialog: MatDialog
  ) {
    this.logedIn = auth.signedIn.subscribe((val) => {
      this.logged = val ? true : false;
      this.getResources();
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.logedIn.unsubscribe();
  }
  OnChanges(): void {
    if (!this.logged) {
      this.ngOnInit();
    }
  }
  /**
   *Loads all the resources
   */
  getResources() {
    if (this.logged == true) {
      let promise = this.downloadService.getAllResources(this.logged);
      promise.then((value) => {
        this.data = value;
      });
    } else {
      let promise = this.downloadService.getPlanResources(this.logged);
      promise.then((value) => {
        this.data = value;
      });
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
  /**
   *Adds resource to biblio
   */
  save(resource: any) {
    this.downloadService.addBiblioResource(resource.id);
  }

  openImage(resource: any) {
    const dialogRef = this.dialog.open(ImageContainer, {
      width: '50%',
      height: '50%',
      data: { name: resource.nombre, image: resource.recurso },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
@Component({
  selector: 'r',
  templateUrl: './dialog.html',
})
export class ImageContainer {
  resource: any;
  constructor(
    private _sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<ImageContainer>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.resource = data;
  }

  decode() {
    let objectURL = 'data:image/jpeg;base64,' + this.data.image;
    let thumbnail = this._sanitizer.bypassSecurityTrustUrl(objectURL);
    return thumbnail;
  }
}
