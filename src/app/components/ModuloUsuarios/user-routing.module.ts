import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreateuserComponent } from './createuser/createuser.component';
import { EditUserInfoComponent } from './edit-user-info/edit-user-info.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { DeactivateComponent } from './deactivate/deactivate.component';
import { AuthGuard } from 'src/app/services/moduloUsuarios/auth.guard';

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
      canActivate: [AuthGuard],
    },
    {
      path: 'password-reset',
      component: PasswordresetComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'profile-user',
      component: UserprofileComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'deactivate-user',
      component: DeactivateComponent,
      canActivate: [AuthGuard],
    },
  ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
