import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/moduloUsuarios/auth.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public loginForm = this.formBuilder.group({
    password: '',
    email: '',
  });
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: Router
  ) {}

  /**
   *Calls login with email and passes user data
   */
  loginEmail() {
    let pass = this.loginForm.get('password')?.value;
    let email = this.loginForm.get('email')?.value;
    this.authService.loginEmail(email, pass);
    this.loginForm.reset()
  }
  /**
  Calls login with google method
  */
  loginGoogle() {
    this.authService.loginGoogle();
  }

  create(){
    this.route.navigateByUrl('user/create-user');
  }
}
