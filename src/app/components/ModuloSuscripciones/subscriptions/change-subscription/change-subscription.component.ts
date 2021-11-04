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
    //Se obtiene el usuario loggeado
    this.logedIn = authService.signedIn.subscribe((user) => {
      this.user = user;
    });
   }

  ngOnInit(): void {    
    //Se obtienen los planes registrados
    this.suscriptionService.readDataPlans().subscribe(data => {
      this.plans = data;
      this.plans.forEach(plan => {      
        plan.desList = plan.descripcion.split(',');
      });  
    });
    this.suscriptionService.getPlans();
  }

  suscribe(planID: number){  
    //Al seleccionar un plan se registra en la variable planID, la cual será enviada al componente nuevo pago para realizar la suscripción
    this.planID = planID;
  }

  resetSubscription(){
    //Si se selecciona cancelar se resetea la variable y se recarga la página de inicio
    this.planID= 0;
    this.router.navigate(['./']);
  }

}
