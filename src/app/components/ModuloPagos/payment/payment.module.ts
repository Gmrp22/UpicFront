import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { NewPaymentComponent } from './new-payment/new-payment.component';
import { ChangeDateComponent } from './change-date/change-date.component';


@NgModule({
  declarations: [
    NewPaymentComponent,
    ChangeDateComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule
  ]
})
export class PaymentModule { }
