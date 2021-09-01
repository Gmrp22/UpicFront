import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [ {
      path: 'payment',
      loadChildren: () => import('./components/ModuloPagos/payment/payment.module').then(mod => mod.PaymentModule),
    },
    {
      path: 'subscription',
      loadChildren: () => import('./components/ModuloSuscripciones/subscriptions/subscriptions.module').then(mod => mod.SubscriptionsModule),
    }]
  },
  {
    path: '',
    children: [ {
      path: 'download',
      loadChildren: () => import('./components/ModuloDescargas/downloads.module').then(mod => mod.DownloadsModule),
    }]
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
