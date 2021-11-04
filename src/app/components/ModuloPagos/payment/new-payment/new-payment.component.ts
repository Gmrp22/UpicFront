import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PagosService } from 'src/app/services/moduloPagos/pagos.service';
import { SuscripcionService } from 'src/app/services/moduloSuscripciones/suscripcion.service';
import { AuthService } from 'src/app/services/moduloUsuarios/auth.service';
import { UserInfo } from 'src/app/services/moduloUsuarios/interface/userInfo';
import { NotificationService } from 'src/app/services/notifications/notification.service';
import { SubscriptionItem } from 'src/app/models/subscriptionItem';

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.css']
})
export class NewPaymentComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('cardInfo') cardInfo?: ElementRef;
  public user: UserInfo | undefined;
  public logedIn: Subscription;
  public token: any;
  public userToken: Subscription;
  subscription: SubscriptionItem = { planId: 0 };
  cardError?: string | null;
  card: any;
  susc: any;
  planID: any;
  
  constructor( private ngZone: NgZone, public suscriptionService: SuscripcionService,
    private router: Router, private actRouter: ActivatedRoute, private pagosService: PagosService, public notificationService: NotificationService, private authService: AuthService ) {      
      //Se obtiene el usuario loggeado
      this.logedIn = authService.signedIn.subscribe((user) => {
        this.user = user;
      });
      //Se obtiene el token
      this.userToken = authService.userToken.subscribe((token) => {
        this.token = token;
      });
      
    }
    
    ngOnInit(): void {  
      //Se obtiene el plan actual  
      this.suscriptionService.getSubscription(this.user?.email! ? this.user?.email : '').subscribe(data => {
        this.susc = data; 
      })    
      //Se recibe el plan id escogido en el componente de cambiar suscripción
      this.planID = this.actRouter.snapshot.paramMap.get('id');
      //Se setea el id de la suscripción en la variable que será enviada como json en la petición
      this.subscription = { planId: +this.planID };
  }

  ngAfterViewInit(){
    //Se crea un nuevo elemento de stripe de tipo card
    this.card = elements.create('card');
    //Se monta el elemento en el div con id cardInfo
    this.card.mount(this.cardInfo?.nativeElement);
    //Se agrega un eventListener en caso de que se generen errores al ingresar datos de la tarjeta
    this.card.addEventListener('change', this.onChange.bind(this));
  }

  ngOnDestroy(){
    //Al salir del componente se elimina el elemento de tipo card
    this.card.destroy();
  }

  onChange({error}:any){
    //Si hay errores se cambia el valor de la variable cardError para mostrarlo en un div
    if(error){
      this.ngZone.run(()=> this.cardError = error.message);      
    }    
    else{
      this.ngZone.run(()=> this.cardError = null);
    }        
  }

  async onClick(){
    //Se obtiene el elemento de tipo card
    const card = elements.getElement('card');
    //Se crea el método de pago con función de stripe, mandando el elemento card
    const {paymentMethod, error} = await stripe.createPaymentMethod({
      type: 'card',
      card: card
     });
    if(paymentMethod!){ //Si existe el paymentMethod, es decir, si se registró la tarjeta sin errores en campos
      this.pagosService.charge(this.user?.email, paymentMethod.id, this.token).subscribe(data =>{ //Se llama al servicio que registra el método de pago         
        this.suscriptionService.changeSubscription(this.subscription, this.susc.id).subscribe(data =>{ //Después del método de pago, se llama al servicio que registra el cambio de suscripción
        }, err => {
          this.notificationService.error("No se pudo realizar la acción, por favor intente de nuevo"); //en caso de errores devuelve una notificación
        });
        this.notificationService.success("Suscripción realizada exitosamente"); //en caso de éxito indica con notificación
      }, err => {
        this.notificationService.error(error); 
      });     
    }
    else{
      this.notificationService.error("No se pudo realizar la acción, por favor intente de nuevo");    
    }
  }

}
