import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SuscripcionService } from 'src/app/services/moduloSuscripciones/suscripcion.service';

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.css']
})
export class NewPaymentComponent implements OnInit {

  constructor( public suscriptionService: SuscripcionService, private router: Router ) {
    console.log(this.router.getCurrentNavigation()?.extras.state);
   }

  ngOnInit(): void {    
  }

  saveSuscription(){    
    if(this.router.getCurrentNavigation()?.extras.state?.subscription.planId !== 0){     
      this.suscriptionService.subscribe(this.router.getCurrentNavigation()?.extras.state?.subscription).subscribe(data =>{
        console.log('success');      
      }, err => {
        console.log('error');
      });
    }
  }

}
