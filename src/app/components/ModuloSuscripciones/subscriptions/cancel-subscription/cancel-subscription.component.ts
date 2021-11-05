import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserInfo } from 'src/app/services/moduloUsuarios/interface/userInfo';
import { SuscripcionService } from 'src/app/services/moduloSuscripciones/suscripcion.service';
import { AuthService } from 'src/app/services/moduloUsuarios/auth.service';
import { NotificationService } from 'src/app/services/notifications/notification.service';

@Component({
  selector: 'app-cancel-subscription',
  templateUrl: './cancel-subscription.component.html',
  styleUrls: ['./cancel-subscription.component.css']
})
export class CancelSubscriptionComponent implements OnInit {

  public user: UserInfo | undefined;
  public logedIn: Subscription;
  public userToken: Subscription;
  public token: any;
  susc: any;
  constructor( public suscriptionService: SuscripcionService, private authService: AuthService, public notificationService: NotificationService ) {
    // The logged in user is obtained
    this.logedIn = authService.signedIn.subscribe((user) => {
      this.user = user;
    });
    // The token is obtained
    this.userToken = authService.userToken.subscribe((token) => {
     this.token = token;
   });
  }

  ngOnInit(): void {
    // The current plan is obtained
    this.suscriptionService.getSubscription(this.user?.email! ? this.user?.email : '').subscribe(data => {
      this.susc = data; 
    })  
  }

  cancelSubscription(){
    if(this.susc !== undefined){     //If the subscription it's defined
      this.suscriptionService.unSubscribe(this.susc.id, this.token).subscribe(data =>{ //call the unsubscribe method
        this.notificationService.success("Suscripción cancelada exitosamente"); // on success indicate with notification     
      }, err => {
        this.notificationService.error("No se pudo realizar la acción, por favor intente de nuevo"); // in case of errors it returns a notification
      });
    }
  }

}
