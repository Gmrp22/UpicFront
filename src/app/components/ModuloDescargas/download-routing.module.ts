
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadResourceComponent } from './upload-resource/upload-resource.component';

const routes: Routes = [
  {
    path: '',
    children: [ {
      path: '',
      component: UploadResourceComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DownloadRoutingModule { }
