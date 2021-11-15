import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { PrincipalComponent } from './components/Extras/principal/principal.component';
const routes: Routes = [
  {
    path: '',
    component: PrincipalComponent,

  },
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./components/ModuloPagos/payment/payment.module').then(
            (mod) => mod.PaymentModule
          ),
        canActivate: [AngularFireAuthGuard],
      },
      {
        path: '',
        loadChildren: () =>
          import(
            './components/ModuloSuscripciones/subscriptions/subscriptions.module'
          ).then((mod) => mod.SubscriptionsModule),
        canActivate: [AngularFireAuthGuard],
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
  {
    path: 'main',
    component: PrincipalComponent,

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
