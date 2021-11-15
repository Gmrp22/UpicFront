import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionsRoutingModule } from './subscriptions-routing.module';
import { NewSubscriptionComponent } from './new-subscription/new-subscription.component';
import { CancelSubscriptionComponent } from './cancel-subscription/cancel-subscription.component';
import { ChangeSubscriptionComponent } from './change-subscription/change-subscription.component';
import { SuscripcionService } from 'src/app/services/moduloSuscripciones/suscripcion.service';


@NgModule({
  declarations: [
    NewSubscriptionComponent,
    CancelSubscriptionComponent,
    ChangeSubscriptionComponent
  ],
  imports: [
    CommonModule,
    SubscriptionsRoutingModule
  ],
  providers: [SuscripcionService ]
})
export class SubscriptionsModule { }
