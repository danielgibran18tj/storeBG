import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    // Obtener la ruta completa (URL) que se intenta acceder
    const requestedUrl: string = state.url;
    console.log('Ruta que se intenta acceder:', requestedUrl);
    
    const token = this.authService.getToken();

    if (token) {
      return true;
    } else {
      // Redirige a la página de inicio de sesión si no hay un token
      this.router.navigate(['/login']);
      return false;
    }
  }
}
