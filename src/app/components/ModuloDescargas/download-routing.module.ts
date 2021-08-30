
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadResourceComponent } from './upload-resource/upload-resource.component';
import { ResourceComponent } from './resource/resource.component';
import { RateResourceComponent } from './rate-resource/rate-resource.component';
import { MyresourcesComponent } from './myresources/myresources.component';
const routes: Routes = [
  {
    path: '',
    children: [ {
      path: 'upload-resource',
      component: UploadResourceComponent
    },
    {
      path: 'info-resource',
      component: ResourceComponent

    },
    {
      path: 'rate-resource',
      component: RateResourceComponent

    },
    {
      path: 'my-resources',
      component: MyresourcesComponent

    }
 
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DownloadRoutingModule { }
