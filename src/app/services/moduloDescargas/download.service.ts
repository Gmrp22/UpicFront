import { Injectable } from '@angular/core';
import { Resource } from './interface/resource';
import { ResourceService } from './resource.service';
import { NotificationService } from '../notifications/notification.service';
import { BiblioService } from './biblio/biblio.service';
import { Biblio } from './interface/biblio';
@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  constructor(
    private resourceService: ResourceService,
    private notification: NotificationService,
    private biblio: BiblioService
  ) {}
  /**
   *Descubre:
   */
  /**
   *Get all resources if its logged
   */
  async getAllResources(logged: boolean) {
    let data: Resource[] = [];
    let promise = new Promise((resolve, reject) => {
      this.notification.loading();
      this.resourceService.getAllResources(logged).subscribe((v) => {
        data = v;
        resolve('')
      });
    });

    let result = await promise; // wait until the promise resolves
    this.notification.exitLoading(10);
    return data;
  }
  /**
   *Get resources by plan
   */
  async getPlanResources(logged: boolean) {
    let data: Resource[] = [];
    let promise = new Promise((resolve, reject) => {
      this.notification.loading();
      this.resourceService.getPlanResources(3).subscribe((v) => {
        data = v;
      resolve('')
      });
    });

    let result = await promise; // wait until the promise resolves
    this.notification.exitLoading(10);
    return data;
  }

   /**
   *Biblioteca:
   */
  /**
   *Get all biblio resources
   */
   async getBiblioResource() {
    let data: Biblio[] = [];
    let promise = new Promise((resolve, reject) => {
      this.notification.loading();
      this.biblio.getBiblioResource().subscribe((v) => {
        data = v;
        resolve('')
      },
      (err) => reject('')
      
      );
    });

    let result = await promise; // wait until the promise resolves
    this.notification.exitLoading(10);
    return data;
  }
  /**
   *Add resource to biblio
   */
   addBiblioResource(id:number) {
    this.biblio.saveResource(id).subscribe(val => this.notification.success("Recurso agregado"))
    
}
}