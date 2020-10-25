import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AccountDetailsComponent } from './page/account-details/account-details.component';
import { LoginComponent } from './page/login/login.component';
import { RegistrationComponent } from './page/registration/registration.component';
import { SuccessComponent } from './page/success/success.component';
import { VerificationComponent } from './page/verification/verification.component';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { MainLandingComponent } from './shared/main-landing/main-landing.component';
import { NotFoundComponent } from './page/not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    AccountDetailsComponent,
    LoginComponent,
    RegistrationComponent,
    SuccessComponent,
    VerificationComponent,
    MainLayoutComponent,
    MainLandingComponent,
    NotFoundComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  exports: [],
  providers: [],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule {
}
