import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Resource } from './interface/resource';
import { ResourceService } from './resource.service';
import { NotificationService } from '../notifications/notification.service';
@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(
    private resourceService: ResourceService,
    private notification: NotificationService
  ) {}

  /**
   *Uploads the resource
   */
  async uploadResource(resource: FormGroup, img: string) {
    let recurso: Resource = {
      nombre: resource.get('name')?.value,
      tipo: resource.get('type')?.value,
      plan: resource.get('plan')?.value,
      recurso: img,
      owner: 2,
    };
    let promise = new Promise((resolve, reject) => {
      this.notification.loading();

      this.resourceService.uploadResource(recurso).subscribe(
        (value) => {
          this.notification.success('Recurso agregado');
          resolve('');
          this.notification.exitLoading(10);
        },
        (err) => {
          reject('');
          this.notification.exitLoading(10);
        }
      );
    });

    let result = await promise; // wait until the promise resolves
    promise.then((val) => this.notification.success('Recurso agregado'));
  }
}
