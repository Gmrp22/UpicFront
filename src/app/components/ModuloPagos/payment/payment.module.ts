import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    PaymentRoutingModule,
    FormsModule 
  ]
})
export class PaymentModule { }
