import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlanItem } from 'src/app/models/planItem';
import { SubscriptionItem } from 'src/app/models/subscriptionItem';
import { SuscripcionService } from 'src/app/services/moduloSuscripciones/suscripcion.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/moduloUsuarios/auth.service';
import { UserInfo } from 'src/app/services/moduloUsuarios/interface/userInfo';

@Component({
  selector: 'app-change-subscription',
  templateUrl: './change-subscription.component.html',
  styleUrls: ['./change-subscription.component.css']
})
export class ChangeSubscriptionComponent implements OnInit {

  plans: PlanItem[] = [];  
  planID: number = 0;
  subscription: SubscriptionItem = { planId: 0 };
  public logedIn: Subscription;
  public user: UserInfo | undefined;
  susc: any;
  constructor(public suscriptionService: SuscripcionService, private router: Router, private authService: AuthService ) {
    this.logedIn = authService.signedIn.subscribe((user) => {
      this.user = user;
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
    this.suscriptionService.getSubscription(this.user?.email! ? this.user?.email : '').subscribe(data => {
      this.susc = data;
      console.log(this.susc);    
    })
  }

  suscribe(planID: number){    
    this.planID = planID;
    this.subscription = {
      planId: planID
    }
  }

  resetSubscription(){
    this.subscription = {
      planId: 0
    }
    this.router.navigate(['./']);
  }

  saveSuscription(){    //change and add to html
    if(this.subscription.planId !== 0){
      this.suscriptionService.changeSubscription(this.subscription, this.susc).subscribe(data =>{
        this.router.navigate(['payment/new-payment']);
        console.log('success');      
      }, err => {
        console.log('error');
      });
    }
  }

}
