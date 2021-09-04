
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadResourceComponent } from './upload-resource/upload-resource.component';
import { ResourceComponent } from './resource/resource.component';
import { RateResourceComponent } from './rate-resource/rate-resource.component';
import { AllresourcesComponent } from './allresources/allresources.component';
import { MyresourcesComponent } from './myresources/myresources.component';
import { SavedresourcesComponent } from './savedresources/savedresources.component';
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
      path: 'all-resources',
      component: AllresourcesComponent

    },
    {
      path: 'my-resources',
      component: MyresourcesComponent

    },
    {
      path: 'saved-resources',
      component: SavedresourcesComponent

    }
 
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DownloadRoutingModule { }
