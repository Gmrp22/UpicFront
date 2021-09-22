import { NgModule } from '@angular/core';
// Core Modules:
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
// Components:
import { AppComponent } from './components/app/app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
// GUI Modules:
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
// Project Modules:
import { DownloadsModule } from './components/ModuloDescargas/downloads.module';
import { PaymentModule } from './components/ModuloPagos/payment/payment.module';
import { ReportComponent } from './components/ModuloReportes/report/report.component';
import { UserModule } from './components/ModuloUsuarios/user.module';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from  '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    ReportComponent,

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
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

