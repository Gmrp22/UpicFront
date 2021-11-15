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
      // The plan id chosen in the change subscription component is received
      this.planID = this.actRouter.snapshot.paramMap.get('id');
      // Set the subscription id in the variable that will be sent as json in the request
      this.subscription = { planId: +this.planID };
  }

  ngAfterViewInit(){
    // A new stripe element of type card is created
    this.card = elements.create('card');
    // The element is mounted in the div with id cardInfo
    this.card.mount(this.cardInfo?.nativeElement);
    // An eventListener is added in case errors are generated when entering card data
    this.card.addEventListener('change', this.onChange.bind(this));
  }

  ngOnDestroy(){
    // When exiting the component, the element of type card is eliminated
    this.card.destroy();
  }

  onChange({error}:any){
    // If there are errors, the value of the cardError variable is changed to show it in a div
    if(error){
      this.ngZone.run(()=> this.cardError = error.message);      
    }    
    else{
      this.ngZone.run(()=> this.cardError = null);
    }        
  }

  async onClick(){
    // The element of type card is obtained
    const card = elements.getElement('card');
    // The payment method is created with the stripe function, sending the card element
    const {paymentMethod, error} = await stripe.createPaymentMethod({
      type: 'card',
      card: card
     });
    if(paymentMethod!){ // If the paymentMethod exists, that is, if the card was registered without errors in fields
      this.pagosService.charge(this.user?.email, paymentMethod.id, this.token).subscribe(data =>{ // The service that registers the payment method is called
        this.suscriptionService.changeSubscription(this.subscription, this.susc.id).subscribe(data =>{ // After the payment method, the service that records the subscription change is called
        }, err => {
          this.notificationService.error("No se pudo realizar la acción, por favor intente de nuevo"); // in case of errors it returns a notification
        });
        this.notificationService.success("Suscripción realizada exitosamente"); // on success indicate with notification
      }, err => {
        this.notificationService.error(error); 
      });     
    }
    else{
      this.notificationService.error("No se pudo realizar la acción, por favor intente de nuevo");    
    }
  }

}
