import { Injectable } from '@angular/core';
import { Resource } from './interface/resource';
import { ResourceService } from './resource.service';
import { NotificationService } from '../notifications/notification.service';
@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  constructor(
    private resourceService: ResourceService,
    private notification: NotificationService
  ) {}

  /**
   *Get all resources if its logged, if not it gets the free resources
   */
  // async getAllResources(logged: boolean) {
  //   let data: Resource[] = [];
  //   if (logged == true) {
  //     this.resourceService
  //       .getAllResources(logged)
  //       .subscribe((response) => {
  //         data = response
  //         console.log(data, 'funcion1');
  //       });

  //   } else {
  //     this.resourceService.getPlanResources(3).subscribe((response) => {
  //       data = response;
  //       console.log(data, 'funcion2');
  //     });

  //   }
  //   let r = await data
  //   return data;
  // }

  async getAllResources(logged: boolean) {
    let data: Resource[] = [];
    let promise = new Promise((resolve, reject) => {
      this.notification.loading();
      this.resourceService.getAllResources(logged).subscribe((v) => {
        data = v;
        setTimeout(() => resolve(''), 1000);
      });
    });

    let result = await promise; // wait until the promise resolves
    this.notification.exitLoading(100);
    return data;
  }

  async getPlanResources(logged: boolean) {
    let data: Resource[] = [];
    let promise = new Promise((resolve, reject) => {
      this.notification.loading();
      this.resourceService.getPlanResources(3).subscribe((v) => {
        data = v;
        setTimeout(() => resolve(''), 1000);
      });
    });

    let result = await promise; // wait until the promise resolves
    this.notification.exitLoading(10);
    return data;
  }

  // async getAllResources(logged: boolean) {
  //   let data: Resource[] = [];

  //   let promesa = this.resourceService.getAllResources(logged).toPromise();
  //   await promesa
  //   return promesa;
  // }

  // async getPlanResources(logged: boolean) {
  //   let data: Resource[] = [];

  //   let promesa = this.resourceService.getPlanResources(3).toPromise();
  //   await promesa
  //   return promesa;
  // }
}
