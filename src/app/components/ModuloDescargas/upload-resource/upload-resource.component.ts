import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UploadService } from 'src/app/services/moduloDescargas/upload.service';
import { Resource } from 'src/app/services/moduloDescargas/interface/resource';
import { Router } from '@angular/router';
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
    private uploadService: UploadService,
    private router: Router
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
      let promise = this.uploadService.uploadResource(
        this.resourceForm,
        this.image
      );
      promise
        .then((val) => this.router.navigateByUrl('download/my-resource'))
        .catch((err) => setTimeout(() => window.location.reload(), 1000));
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
      this.image = this.url.replace('data:', '').replace(/^.+,/, '');
    };
  }
}
