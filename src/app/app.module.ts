import { NgModule } from '@angular/core';
// Core Modules:
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
// Components:
import { AppComponent } from './components/app/app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
// GUI Modules:
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
// Project Modules:
import { DownloadsModule } from './components/ModuloDescargas/downloads.module';
import { PaymentModule } from './components/ModuloPagos/payment/payment.module';
import { UserModule } from './components/ModuloUsuarios/user.module';

import { environment } from 'src/environments/environment';
import { HttpClientModule } from  '@angular/common/http';
import { fireKey } from 'src/environments/firebaseKey';
import { PrincipalComponent } from './components/Extras/principal/principal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PrincipalComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    DownloadsModule,
    PaymentModule,
    UserModule,
    // Firebase config
    AngularFireModule.initializeApp(fireKey.firebaseConfig),
    AngularFireAuthModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

