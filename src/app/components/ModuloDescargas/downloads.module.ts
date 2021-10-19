import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadResourceComponent } from './upload-resource/upload-resource.component';
import { DownloadRoutingModule } from './download-routing.module';
import { ResourceComponent } from './resource/resource.component';
import { RateResourceComponent } from './rate-resource/rate-resource.component';
import { AllresourcesComponent } from './allresources/allresources.component';
import { MyresourcesComponent } from './myresources/myresources.component';
import { SavedresourcesComponent } from './savedresources/savedresources.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ResourceInterceptorService } from 'src/app/services/moduloDescargas/resource-interceptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    UploadResourceComponent,
    ResourceComponent,
    RateResourceComponent,
    AllresourcesComponent,
    MyresourcesComponent,
    SavedresourcesComponent,
  ],
  imports: [
    CommonModule,
    DownloadRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResourceInterceptorService,
      multi: true
    }
  ]
})
export class DownloadsModule { }
