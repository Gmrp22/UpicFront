import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/moduloUsuarios/auth.service';
import { FormValidatorService } from 'src/app/services/moduloUsuarios/form-validator.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css'],
})
export class CreateuserComponent {
  /**
   *Form group for new user
   */
  public signupForm = this.formBuilder.group({
    name: '',
    password: '',
    email: '',
    cpassword: '',
  });
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private customValidator: FormValidatorService,
    private route: Router
  ) {
    this.signupForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        cpassword: ['', [Validators.required]],
      },
      {
        validator: this.customValidator.MatchPassword('password', 'cpassword'),
      }
    );
  }

  /**
   *Calls create user method
   */
  submit() {
    this.submitted = true;
    if (this.signupForm.valid) {
      this.authService.emailSignup(this.signupForm);
    } else {
      console.log('.nek');
    }
  }

  get registerFormControl() {
    return this.signupForm.controls;
  }
  login(){
    this.route.navigateByUrl('user/login');
  }
}
