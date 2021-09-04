import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [ {
      path: '',
      loadChildren: () => import('./components/ModuloPagos/payment/payment.module').then(mod => mod.PaymentModule),
    }]
  },
  {
    path: '',
    children: [ {
      path: 'downloads',
      loadChildren: () => import('./components/ModuloDescargas/downloads.module').then(mod => mod.DownloadsModule),
    }]
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
