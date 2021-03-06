import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { CreateuserComponent } from './createuser/createuser.component';
import { LoginComponent } from './login/login.component';
import { EditUserInfoComponent } from './edit-user-info/edit-user-info.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { DeactivateComponent } from './deactivate/deactivate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserInterceptorService } from 'src/app/services/moduloUsuarios/user-interceptor.service';
@NgModule({
  declarations: [
    LoginComponent,
    CreateuserComponent,
    EditUserInfoComponent,
    PasswordresetComponent,
    UserprofileComponent,
    DeactivateComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UserInterceptorService,
      multi: true
    }
  ]
})
export class UserModule { }
