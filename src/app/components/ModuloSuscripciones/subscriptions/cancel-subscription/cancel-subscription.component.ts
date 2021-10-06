import { Component, OnInit } from '@angular/core';
import { SuscripcionService } from 'src/app/services/moduloSuscripciones/suscripcion.service';

@Component({
  selector: 'app-cancel-subscription',
  templateUrl: './cancel-subscription.component.html',
  styleUrls: ['./cancel-subscription.component.css']
})
export class CancelSubscriptionComponent implements OnInit {

  userID?: number;
  constructor( public suscriptionService: SuscripcionService) { }

  ngOnInit(): void {
    this.userID = 4;
  }

  cancelSubscription(){
    if(this.userID !== undefined){     
      this.suscriptionService.unSubscribe(this.userID).subscribe(data =>{
        console.log('success');      
      }, err => {
        console.log('error');
      });
    }
  }

}
