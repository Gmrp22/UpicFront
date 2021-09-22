import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/moduloUsuarios/auth.service';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm = this.formBuilder.group({
    password: '',
    email: '',
  });
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}
  loginEmail(){
    let pass = this.loginForm.get('password')?.value
    let email = this.loginForm.get('email')?.value 
    console.log(email)
    this.authService.loginEmail(email, pass);
  }
  loginGoogle() {
    this.authService.loginGoogle();
  }
  logout() {
    this.authService.logout();
  }
}
