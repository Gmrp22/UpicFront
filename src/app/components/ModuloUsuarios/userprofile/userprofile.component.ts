import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/moduloUsuarios/auth.service';
import { UserInfo } from 'src/app/services/moduloUsuarios/userInfo';
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css'],
})
export class UserprofileComponent implements OnDestroy {
  public user: UserInfo | undefined;
  public logedIn: Subscription;

  /**
  *Subscribes to auth signedIn observable
  */
  constructor(private authService: AuthService) {
    this.logedIn = authService.signedIn.subscribe((user) => {
      this.user = user;
    });
  }

  /**
  *Unsuscribes from auth service signedIn
  */
  ngOnDestroy(): void {
    this.logedIn.unsubscribe();
  }
}
