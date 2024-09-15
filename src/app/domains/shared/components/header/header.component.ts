import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges, inject, signal } from '@angular/core';
import { Product } from '../../models/product.model';
import { CartService } from '../../service/cart.service';
import { Router, RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { routes } from '../../../../app.routes';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  hideSideMenu = signal(true);
  rolActual = localStorage.getItem('authRol');
  // @Input({required: true}) cart: Product[] = []
  // total = signal(0);

  // por este medio esta inyectando la informacion de los productos seleccionados
  private cartService = inject(CartService)
  total = this.cartService.total;
  cart = this.cartService.cart;

  constructor(    
    private router: Router,
  ){}

  toogleSideMenu(){
    this.hideSideMenu.update(prevState => !prevState)
  }

  eliminarItem(index: number){
    const newCart = [...this.cart()]; // Copia del arreglo actual
    newCart.splice(index, 1); // Elimina el elemento en el índice especificado
    this.cart.set(newCart); // Actualiza el signal con el nuevo arreglo
  }

  cerrarSession(){
    localStorage.clear();
    this.router.navigate(['/login'])
    console.log(this.rolActual);
    
  }
  // ngOnChanges(changes: SimpleChanges): void {
  //   const carrt = changes['cart'];
    
  //   if (carrt){
  //     this.total.set(this.calcTotal())
  //   }
  // }

  // calcTotal(){
  //   return this.cart.reduce((total, product) => total + product.price , 0) ;
  // }
}
