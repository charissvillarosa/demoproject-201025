import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { RegistrationComponent } from './page/registration/registration.component';
import { SuccessComponent } from './page/success/success.component';
import { VerificationComponent } from './page/verification/verification.component';
import { AccountDetailsComponent } from './page/account-details/account-details.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { RequireAuthenticatedGuard } from './guard/require-authenticated.guard';
import { RequireUnauthenticatedGuard } from './guard/require-unauthenticated.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [RequireUnauthenticatedGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [RequireUnauthenticatedGuard]
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    canActivate: [RequireUnauthenticatedGuard]
  },
  {
    path: 'account-details',
    component: AccountDetailsComponent
  },
  {
    path: 'success',
    component: SuccessComponent,
    canActivate: [RequireAuthenticatedGuard]
  },
  {
    path: 'verification',
    component: VerificationComponent
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
