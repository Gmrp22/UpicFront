import { stripGeneratedFileSuffix } from '@angular/compiler/src/aot/util';
import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PagosService } from 'src/app/services/moduloPagos/pagos.service';
import { SuscripcionService } from 'src/app/services/moduloSuscripciones/suscripcion.service';
import { AuthService } from 'src/app/services/moduloUsuarios/auth.service';
import { UserInfo } from 'src/app/services/moduloUsuarios/interface/userInfo';
import { NotificationService } from 'src/app/services/notifications/notification.service';

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.css']
})
export class NewPaymentComponent implements OnInit, AfterViewInit {
  @ViewChild('cardInfo') cardInfo?: ElementRef;
  public user: UserInfo | undefined;
  public logedIn: Subscription;
  public token: any;
  public userToken: Subscription;
  // @ViewChild('cardNumber') cardNumberElement?: ElementRef;
  cardError?: string | null;
  // cardNumbError?: string | null;
  // cardExError?: string | null;
  // cardCVVError?: string | null;
  // cardPostError?: string | null;
  card: any;
  // cardnum: any;
  // cardExp: any;
  // cardCVV: any;
  // cardPost: any;

  constructor( private ngZone: NgZone, public suscriptionService: SuscripcionService,
    private router: Router, private pagosService: PagosService, public notificationService: NotificationService, private authService: AuthService ) {
    console.log(this.router.getCurrentNavigation()?.extras.state);
    this.logedIn = authService.signedIn.subscribe((user) => {
      this.user = user;
    });
    this.userToken = authService.userToken.subscribe((token) => {
      this.token = token;
    });
    
   }

  ngOnInit(): void {    
  }

  ngAfterViewInit(){
    this.card = elements.create('card');
   this.card.mount(this.cardInfo?.nativeElement);
  }

  onChange({error}:any){
    if(error){
      this.ngZone.run(()=> this.cardError = error.message);      
    }    
    else{
      this.ngZone.run(()=> this.cardError = null);
    }    
  }

  async onClick(){
    // console.log(this.cardInfo?.nativeElement.querySelector('div')?.querySelector('input')?.value);    
    //const {token, error} = await stripe.createToken(this.card);
    const card = elements.getElement('card');
    const {paymentMethod, error} = await stripe.createPaymentMethod({
      type: 'card',
      card: card
     });
    if(this.router.getCurrentNavigation()?.extras.state?.subscription.planId !== 0){
      //const precio = this.suscriptionService.getPlan(this.router.getCurrentNavigation()?.extras.state?.subscription.precio);
      this.pagosService.charge(this.user?.email, paymentMethod.id, this.token).subscribe(data =>{  
        this.suscriptionService.subscribe(this.router.getCurrentNavigation()?.extras.state?.subscription).subscribe(data =>{
          this.notificationService.success('succes'); 
        }, err => {
          console.log('error');
          this.notificationService.error(error.message); 
        });
      }, err => {
        this.notificationService.error(error.message); 
      });     
    }
    else{
      this.notificationService.error(error.message);    
    }
  }

  // saveSuscription(){    
  //   if(){     
  //     this.suscriptionService.subscribe(this.router.getCurrentNavigation()?.extras.state?.subscription).subscribe(data =>{
  //       console.log('success');      
  //     }, err => {
  //       console.log('error');
  //     });
  //   }
  // }

}
