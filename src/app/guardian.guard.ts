import {Injectable, NgZone} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {AuthService} from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardianGuard implements CanActivate {

  constructor(private auth: AuthService, private route: Router, private ngZone: NgZone) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.auth.getConnectedUser().pipe(map(
        (user: any) => {
          if (!user || !user.emailVerified){
            this.ngZone.run(() => this.route.navigate(['login']));
          }
          return true;
        }
    ));
  }
}
