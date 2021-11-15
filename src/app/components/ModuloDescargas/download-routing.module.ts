
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadResourceComponent } from './upload-resource/upload-resource.component';
import { ResourceComponent } from './resource/resource.component';
import { RateResourceComponent } from './rate-resource/rate-resource.component';
import { AllresourcesComponent } from './allresources/allresources.component';
import { MyresourcesComponent } from './myresources/myresources.component';
import { SavedresourcesComponent } from './savedresources/savedresources.component';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
const routes: Routes = [
  {
    path: 'download',
    children: [ {
      path: 'upload-resource',
      component: UploadResourceComponent,
      canActivate: [AngularFireAuthGuard],
    },
    {                   
      path: 'info-resource',
      component: ResourceComponent,
      canActivate: [AngularFireAuthGuard],

    },
    {
      path: 'rate-resource',
      component: RateResourceComponent,
      canActivate: [AngularFireAuthGuard],

    },
    {
      path: 'all-resource',
      component: AllresourcesComponent

    },
    {
      path: 'my-resource',
      component: MyresourcesComponent,
      canActivate: [AngularFireAuthGuard],

    },
    {
      path: 'saved-resource',
      component: SavedresourcesComponent,
      canActivate: [AngularFireAuthGuard],

    }
 
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DownloadRoutingModule { }
