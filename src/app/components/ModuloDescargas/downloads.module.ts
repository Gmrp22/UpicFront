import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadResourceComponent } from './upload-resource/upload-resource.component';
import { DownloadRoutingModule } from './download-routing.module';
import { ResourceComponent } from './resource/resource.component';
import { RateResourceComponent } from './rate-resource/rate-resource.component';
import { MyresourcesComponent } from './myresources/myresources.component';

@NgModule({
  declarations: [
    UploadResourceComponent,
    ResourceComponent,
    RateResourceComponent,
    MyresourcesComponent,
  ],
  imports: [
    CommonModule,
    DownloadRoutingModule,
  ]
})
export class DownloadsModule { }
