import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/moduloUsuarios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
  loginGoogle() {
    this.authService.loginGoogle();
  }
  logout() {
    this.authService.logout();
  }
}
