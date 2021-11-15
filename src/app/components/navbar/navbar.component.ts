import { Component, Input, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/moduloUsuarios/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  public user: Boolean = false;
  private logedIn: Subscription;
  @Input() logged = false;
  /**
   *Subscribes to get a flag of whether the user is logged
   */
  constructor(private authService: AuthService) {
    this.logedIn = this.authService.signedIn.subscribe(
      (flag) => (this.user = flag)
    );
  }
  /**
   *Logs out and unsubscribes from logged In
   */
  logout() {
    this.logedIn.unsubscribe();
    this.authService.logout();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.logged) {
      this.user = true;
    } else {
      this.user = false;
    }
  }
}
