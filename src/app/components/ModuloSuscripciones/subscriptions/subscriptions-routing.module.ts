import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CancelSubscriptionComponent } from './cancel-subscription/cancel-subscription.component';
import { ChangeSubscriptionComponent } from './change-subscription/change-subscription.component';
import { NewSubscriptionComponent } from './new-subscription/new-subscription.component';

const routes: Routes = [
  {
    path: 'subscription',
    children: [ {
      path: 'new-subscription',
      component: NewSubscriptionComponent
    },
    {
      path: 'cancel-subscription',
      component: CancelSubscriptionComponent
    },
    {
      path: 'change-subscription',
      component: ChangeSubscriptionComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionsRoutingModule { }
