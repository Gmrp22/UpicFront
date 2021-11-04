import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlanItem } from 'src/app/models/planItem';
import { SubscriptionItem } from 'src/app/models/subscriptionItem';
import { SuscripcionService } from 'src/app/services/moduloSuscripciones/suscripcion.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/moduloUsuarios/auth.service';
import { UserInfo } from 'src/app/services/moduloUsuarios/interface/userInfo';

@Component({
  selector: 'app-new-subscription',
  templateUrl: './new-subscription.component.html',
  styleUrls: ['./new-subscription.component.css']
})
export class NewSubscriptionComponent implements OnInit {

  plans: PlanItem[] = [];
  planID: number = 0;
  subscription: SubscriptionItem = { planId: 0 };
  public user: UserInfo | undefined;
  public logedIn: Subscription;
  constructor( public suscriptionService: SuscripcionService, private router: Router, private authService: AuthService ) {
    this.logedIn = this.authService.signedIn.subscribe((user) => {
      this.user = user;
      console.log(user);
      
    });
   }

  ngOnInit(): void {    
    this.suscriptionService.readDataPlans().subscribe(data => {
      this.plans = data;
      this.plans.forEach(plan => {      
        plan.desList = plan.descripcion.split(',');
      });  
    });
    this.suscriptionService.getPlans();    
  }

  suscribe(planID: number){
    this.planID = planID;
    this.subscription = {
      planId: planID
    }
  }

  saveSuscription(){    
    if(this.subscription.planId !== 0){     
      this.router.navigate(['payment/new-payment'], { state: this.subscription });
      //AGREGAR ESTE POST CUANDO SE CONFIRME EL METODO DE PAGO
      this.suscriptionService.changeSubscription(this.subscription, 21).subscribe(data =>{
        console.log('success');      
      }, err => {
        console.log('error');
      });
    }
  }

}
