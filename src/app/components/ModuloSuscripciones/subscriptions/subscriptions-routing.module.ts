import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangeSubscriptionComponent } from './change-subscription/change-subscription.component';
import { NewSubscriptionComponent } from './new-subscription/new-subscription.component';

const routes: Routes = [
  {
    path: '',
    children: [ {
      path: '',
      component: NewSubscriptionComponent
    },
    {
      path: 'changeSubscription',
      component: ChangeSubscriptionComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionsRoutingModule { }
