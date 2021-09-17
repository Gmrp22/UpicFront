import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/moduloUsuarios/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public user : Boolean = false;
  public logedIn: Subscription | undefined;
  constructor(private authService : AuthService) {
    this.logedIn = this.authService.signedIn.subscribe(flag =>
      this.user = flag
      );
    
   }

  ngOnInit(): void {
  }
  logout() {
    this.authService.logout();
  }
}
