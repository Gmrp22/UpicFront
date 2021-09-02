
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangeDateComponent } from './change-date/change-date.component';
import { NewPaymentComponent } from './new-payment/new-payment.component';

const routes: Routes = [
  {
    path: '',
    children: [ {
      path: 'newPayment',
      component: NewPaymentComponent
    },
    {
      path: 'changeDate',
      component: ChangeDateComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
