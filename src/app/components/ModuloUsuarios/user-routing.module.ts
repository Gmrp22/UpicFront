import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreateuserComponent } from './createuser/createuser.component';
import { EditUserInfoComponent } from './edit-user-info/edit-user-info.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { DeactivateComponent } from './deactivate/deactivate.component';

const routes: Routes = [
  {
    path: 'user',
    children: [ {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'create-user',
      component: CreateuserComponent
    },
    {
      path: 'edit-user',
      component: EditUserInfoComponent,
    },
    {
      path: 'password-reset',
      component: PasswordresetComponent
    },
    {
      path: 'profile-user',
      component: UserprofileComponent
    },
    {
      path: 'deactivate-user',
      component: DeactivateComponent
    },
  ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
