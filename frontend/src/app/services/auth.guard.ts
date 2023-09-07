import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import {Injectable} from '@angular/core'
import { Observable, take, tap, map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private authService:AuthService, private router: Router){

  }

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.isUserLogin.pipe(
      take(1),
      map(isUserLogin => {
        if (isUserLogin) {
          return true;
        } else {
          return this.router.createUrlTree(['/login']);
        }
      })
    );
  }
};

// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
// import {Injectable} from '@angular/core'
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })

// export class AuthGuard implements CanActivate {
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot):boolean {
//       return true
//     }
// };

