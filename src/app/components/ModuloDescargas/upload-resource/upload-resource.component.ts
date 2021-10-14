import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UploadService } from 'src/app/services/moduloDescargas/upload.service';
import { Resource } from 'src/app/services/moduloDescargas/interface/resource';
@Component({
  selector: 'app-upload-resource',
  templateUrl: './upload-resource.component.html',
  styleUrls: ['./upload-resource.component.css'],
})
export class UploadResourceComponent implements OnInit {
  /**
   *Form group for new resource
   */
  public resourceForm = this.formBuilder.group({
    name: '',
    type: '',
    plan: '',
    resource: '',
  });
  submitted = false;
  url: any;
  msg = '';
  image: any;
  constructor(
    private formBuilder: FormBuilder,
    private uploadService: UploadService
  ) {
    this.resourceForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', [Validators.required]],
      plan: ['', [Validators.required]],
      resource: [''],
    });
  }

  ngOnInit(): void {}
  /**
   *Uploads a new resource if the form is valid
   */
  submit() {
    this.submitted = true;

    if (this.resourceForm.valid) {
      // this.resourceForm.setValue({
      //   resource: this.image,
      // });
      this.uploadService.uploadResource(this.resourceForm, this.image);
    } else {
      console.log('--');
    }
  }
  get registerFormControl() {
    return this.resourceForm.controls;
  }

  /**
   *Event to select a file
   */
  selectFile(event: any) {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.msg = '';
      this.url = reader.result;
      this.image = 'data:image/jpeg;base64,' + btoa(this.url);
      console.log(this.image);
    };
  }
}
