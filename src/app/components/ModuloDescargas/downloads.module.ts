import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadResourceComponent } from './upload-resource/upload-resource.component';
import { DownloadRoutingModule } from './download-routing.module';
import { ResourceComponent } from './resource/resource.component';

@NgModule({
  declarations: [
    UploadResourceComponent,
    ResourceComponent,
  ],
  imports: [
    CommonModule,
    DownloadRoutingModule,
  ]
})
export class DownloadsModule { }
