import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LogginRQ } from '@shared/models/Loggin.model';
import { LoginService } from './service/login.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from './modal/create-user/create-user.component';
import { Usuario } from '@shared/models/User.model';
import { AuthService } from '@shared/service/auth.service';

@Component({
  selector: 'app-loggin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './loggin.component.html',
  styleUrl: './loggin.component.css'
})
export class LogginComponent {

  logginRQ: LogginRQ = new LogginRQ;

  constructor(
    private authService: AuthService,
    private logginService: LoginService,
    private router: Router,
    public dialog: MatDialog
  ) {
    // this.createNewUser()   // linea pendiente a eliminar
  }

  async submitBtn() {
    console.log(this.logginRQ);
    (await this.logginService.getLoggin(this.logginRQ)).subscribe(
      (response) => {
        console.log("response", response);
        this.router.navigate(['/list'])
        this.authService.setToken(response.token, 5); // guardando token con expiracion
        localStorage.setItem('authRol', response.role);
      }, (error) => {
        console.error('Error en la autenticación', error);
        alert("Error en la autenticacion")
      }
    )
  }

  createNewUser() {
    const dialogo1 = this.dialog.open(CreateUserComponent, {
      data: new Usuario
    });

    dialogo1.afterClosed().subscribe(newUser => {
      console.log('after Closed', newUser);
      if (newUser != undefined) {
        this.crearNuevoUsuarioBack(newUser);
      }
    });
  }

  crearNuevoUsuarioBack(user: Usuario) {
    user.status = "activo"
    console.log(user);
    this.logginService.createUser(user).subscribe(
      (response) => {
        console.log(response);
        alert(`${response} \n Ingrese para iniciar sesion`)
      }, (error) => {
        console.error('Error con la creacion de usuario', error);
        alert(`Error con la creacion de usuario: ${error}`)
      }
    )
  }

}
