import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlanItem } from 'src/app/models/planItem';
import { SubscriptionItem } from 'src/app/models/subscriptionItem';
import { SuscripcionService } from 'src/app/services/moduloSuscripciones/suscripcion.service';

@Component({
  selector: 'app-change-subscription',
  templateUrl: './change-subscription.component.html',
  styleUrls: ['./change-subscription.component.css']
})
export class ChangeSubscriptionComponent implements OnInit {

  plans: PlanItem[] = [];  
  planID: number = 0;
  subscription: SubscriptionItem = { planId: 0, usuarioId: 0 };
  constructor(public suscriptionService: SuscripcionService, private router: Router ) { }

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
      planId: planID,
      usuarioId: 1
    }
  }

  resetSubscription(){
    this.subscription = {
      planId: 0,
      usuarioId: 1
    }
    this.router.navigate(['./']);
  }

  saveSuscription(){    //change and add to html
    if(this.subscription.planId !== 0){
      this.suscriptionService.changeSubscription(this.subscription).subscribe(data =>{
        this.router.navigate(['payment/new-payment']);
        console.log('success');      
      }, err => {
        console.log('error');
      });
    }
  }

}
