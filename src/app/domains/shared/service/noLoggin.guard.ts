import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class NoLogginGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    const token = this.authService.getToken();
    // const token = localStorage.getItem('authToken');

    if (token) {
      this.router.navigate(['/list']);
      return false;
    } else {
      return true;
    }
  }

}
