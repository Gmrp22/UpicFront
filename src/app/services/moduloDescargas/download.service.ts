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
