import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/services/moduloUsuarios/auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./components/ModuloPagos/payment/payment.module').then(
            (mod) => mod.PaymentModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: '',
        loadChildren: () =>
          import(
            './components/ModuloSuscripciones/subscriptions/subscriptions.module'
          ).then((mod) => mod.SubscriptionsModule),
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./components/ModuloDescargas/downloads.module').then(
            (mod) => mod.DownloadsModule
          ),
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./components/ModuloUsuarios/user.module').then(
            (mod) => mod.UserModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
