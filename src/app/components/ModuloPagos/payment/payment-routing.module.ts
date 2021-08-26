
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewPaymentComponent } from './new-payment/new-payment.component';

const routes: Routes = [
  {
    path: '',
    children: [ {
      path: '',
      component: NewPaymentComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }