import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadResourceComponent } from './upload-resource/upload-resource.component';
import { DownloadRoutingModule } from './download-routing.module';

@NgModule({
  declarations: [
    UploadResourceComponent,
  ],
  imports: [
    CommonModule,
    DownloadRoutingModule,
  ]
})
export class DownloadsModule { }
