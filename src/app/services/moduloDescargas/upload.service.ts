import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Resource } from './interface/resource';
import { ResourceService } from './resource.service';
import { NotificationService } from '../notifications/notification.service';
@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private resourceService:ResourceService, private notification:NotificationService) { }

  /**
   *Uploads the resource
   */
  uploadResource(resource: FormGroup, img:string) {
    let recurso: Resource ={ 
    nombre : resource.get('name')?.value,
    tipo : resource.get('type')?.value,
    plan : resource.get('plan')?.value,
    recurso : img,
    owner : 2
  }
  console.log(recurso.recurso)
  this.resourceService.uploadResource(recurso).subscribe(value => {
    this.notification.success("Recurso agregado")
  })
  }
  
  }









