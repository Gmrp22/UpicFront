import { Component, OnInit } from '@angular/core';
import {
  Router,
  ActivatedRoute,
  ParamMap,
  Event as NavigationEvent,
  NavigationStart,
} from '@angular/router';
import { AuthService } from '../../services/moduloUsuarios/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'UpicFront';
  public url = true;
  private event$;
// Get the active route
  constructor(private router: Router, private authService : AuthService) {
    this.event$ = this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationStart) {
        if((event.url == '/user/login') || (event.url == '/user/create-user')){
          this.url = true;
        }
        else{
          this.url=false;
        }
      }
    });
  }
}
