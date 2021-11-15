import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlanItem } from 'src/app/models/planItem';
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
  public logedIn: Subscription;
  public user: UserInfo | undefined;
  constructor(public suscriptionService: SuscripcionService, private router: Router, private authService: AuthService ) {
    // The logged in user is obtained
    this.logedIn = authService.signedIn.subscribe((user) => {
      this.user = user;
    });
   }

  ngOnInit(): void {    
    // Registered plans are obtained
    this.suscriptionService.readDataPlans().subscribe(data => {
      this.plans = data;
      this.plans.forEach(plan => {      
        plan.desList = plan.descripcion.split(',');
      });  
    });
    this.suscriptionService.getPlans();
  }
  ngOnDestroy(): void {
    this.logedIn.unsubscribe()

    }

  suscribe(planID: number){  
    // When selecting a plan, it is recorded in the variable planID, which will be sent to the new payment component to make the subscription
    this.planID = planID;
  }

  resetSubscription(){
    // If cancel is selected, the variable is reset and the home page is reloaded
    this.planID= 0;
    this.router.navigate(['./']);
  }

}
