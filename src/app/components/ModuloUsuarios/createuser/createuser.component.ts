import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/moduloUsuarios/auth.service';
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
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  /**
   *Calls create user method
   */
  submit() {
    this.authService.emailSignup(this.signupForm);
  }

  validator() {}
}
