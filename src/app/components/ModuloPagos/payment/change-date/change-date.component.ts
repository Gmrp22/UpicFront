import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SuscripcionService } from 'src/app/services/moduloSuscripciones/suscripcion.service';
import { AuthService } from 'src/app/services/moduloUsuarios/auth.service';
import { UserInfo } from 'src/app/services/moduloUsuarios/interface/userInfo';
import { NotificationService } from 'src/app/services/notifications/notification.service';

@Component({
  selector: 'app-change-date',
  templateUrl: './change-date.component.html',
  styleUrls: ['./change-date.component.css']
})

export class ChangeDateComponent implements OnInit {
  /* Index con los días disponibles para pagar, hasta 28*/
  index = [ "Día", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28 ];
  newDay : any = "Día";
  public user: UserInfo | undefined;
  public logedIn: Subscription;
  susc: any;
  day: any;
  constructor(private authService: AuthService, public suscriptionService: SuscripcionService, public notificationService: NotificationService) { 
    //Se obtiene el usuario loggeado
    this.logedIn = authService.signedIn.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    //Se obtiene la suscripción actual
    this.suscriptionService.getSubscription(this.user?.email! ? this.user?.email : '').subscribe(data => {
      this.susc = data;       
      //Se obtiene el día registrado de la suscripción
      this.day = this.susc.fechaInicio.substring(8,10);
    }) 
  }

  submit(){ 
    if(this.newDay > 0 ){ //Si el nuevo día de pago es válido entonces se realiza el cambio de fecha
      this.notificationService.success("Fecha cambiada exitosamente"); 
    }
    else{
      this.notificationService.error("No se pudo realizar la acción, por favor intente de nuevo"); 
    }
  }

}
