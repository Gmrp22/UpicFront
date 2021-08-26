import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionsRoutingModule } from './subscriptions-routing.module';
import { NewSubscriptionComponent } from './new-subscription/new-subscription.component';
import { CancelSubscriptionComponent } from './cancel-subscription/cancel-subscription.component';
import { ChangeSubscriptionComponent } from './change-subscription/change-subscription.component';


@NgModule({
  declarations: [
    NewSubscriptionComponent,
    CancelSubscriptionComponent,
    ChangeSubscriptionComponent
  ],
  imports: [
    CommonModule,
    SubscriptionsRoutingModule
  ]
})
export class SubscriptionsModule { }
