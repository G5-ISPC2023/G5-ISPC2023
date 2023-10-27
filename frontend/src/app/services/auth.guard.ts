import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private usuarioService: UsuarioService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if (this.authService.isAuthenticatedUser()) {
      const usuarioId = this.authService.getUsuarioId();
      if (usuarioId !== null) {
        this.usuarioService.getUsuarioInfo(usuarioId).subscribe((data) => {
          this.authService.setUserInfo(data);
        });
      }
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
