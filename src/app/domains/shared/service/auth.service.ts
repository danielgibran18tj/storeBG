import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'  // Esto asegura que el servicio sea un singleton y esté disponible en toda la aplicación
})
export class AuthService {

  constructor(private router: Router) { }

  setToken(token: string, expirationInMinutes: number): void {
    const now = new Date();
    const expirationTime = now.getTime() + expirationInMinutes * 60 * 1000; // Convertir minutos a milisegundos

    const tokenData = {
      value: token,
      expiration: expirationTime
    };

    localStorage.setItem('authToken', JSON.stringify(tokenData));
  }

  getToken(): string | null {
    const tokenData = JSON.parse(localStorage.getItem('authToken') || '{}');

    if (!tokenData || !tokenData.expiration) {
      return null; // No hay token o no tiene fecha de expiración
    }

    const now = new Date();

    // Verificar si el token ha expirado
    if (now.getTime() > tokenData.expiration) {
      console.log("token expirado");
      localStorage.removeItem('authToken'); 
      this.router.navigate(['/login']);
      return null;
    }

    return tokenData.value;
  }

  removeToken(): void {
    localStorage.removeItem('authToken');
  }

  // Método para verificar si el usuario está autenticado (opcional)
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}