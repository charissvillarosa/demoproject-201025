import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../service/session.service';

@Injectable({
  providedIn: 'root'
})
export class RequireAuthenticatedGuard implements CanActivate {

  constructor(
    private session: SessionService,
    private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token = this.session.getToken();
    if (token == null || token.isExpired()) {
      console.log(new Date(), token ? 'token is expired in ' + new Date(token.expiresIn) : 'no auth token');
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
