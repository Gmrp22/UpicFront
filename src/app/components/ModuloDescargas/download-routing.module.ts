
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadResourceComponent } from './upload-resource/upload-resource.component';
import { ResourceComponent } from './resource/resource.component';
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

    }
 
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DownloadRoutingModule { }
