import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LogginRQ } from '@shared/models/Loggin.model';
import { LoginService } from './service/login.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from './modal/create-user/create-user.component';
import { Usuario } from '@shared/models/User.model';

@Component({
  selector: 'app-loggin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './loggin.component.html',
  styleUrl: './loggin.component.css'
})
export class LogginComponent {

  logginRQ : LogginRQ = new LogginRQ ;

  constructor(
    private logginService : LoginService,
    private router: Router,
    public dialog: MatDialog
  ) {
    // this.createNewUser()   // linea pendiente a eliminar
   }

  submitBtn(){
    console.log(this.logginRQ);
    this.logginService.getLoggin(this.logginRQ).subscribe(
      (response) => {
        console.log("response" , response);
        this.router.navigate(['/list'])
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('authRol', response.role);
      } , (error) => {
        console.error('Error en la autenticación', error);
        alert("Error en la autenticacion")
      }
    )
  }

  createNewUser(){
      const dialogo1 = this.dialog.open(CreateUserComponent, {
        data: new Usuario
      }
);

      dialogo1.afterClosed().subscribe(newUser => {
        if (newUser != undefined) {
          console.log('after Closed');
          console.log(newUser);
          this.crearNuevoUsuarioBack(newUser);
        }
      });
  }

  crearNuevoUsuarioBack(user : Usuario){
    user.status = "activo"
    this.logginService.createUser(user).subscribe(
      (response) => {
        console.log(response);
        alert(`${response} \n Ingrese para iniciar sesion`)
      } , (error) => {
        console.error('Error en con la creacion de usuario', error);
        alert(`Error en la autenticacion ${error}`)
      }
    )
  }

}
