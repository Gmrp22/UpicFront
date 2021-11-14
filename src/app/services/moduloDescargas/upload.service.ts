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
    };
    let promise = new Promise((resolve, reject) => {
      this.notification.loading();

      this.resourceService.uploadResource(recurso).subscribe(
        (value) => {
          this.notification.success('Recurso agregado');
          this.notification.exitLoading(1);
          resolve('');
        },
        (err) => {
          reject('');
          this.notification.exitLoading(1);
        }
      );
    });

    let result = await promise; // wait until the promise resolves
  }
}
