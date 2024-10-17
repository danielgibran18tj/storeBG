import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges, inject, signal } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { Router, RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { CreateProductComponent } from '../../../products/pages/create-product/create-product.component';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '@shared/models/product.model';
import { ProductService } from '@shared/service/product.service';
import { AuthService } from '@shared/service/auth.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

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
  private productService = inject(ProductService);

  
  // por este medio esta inyectando la informacion de los productos seleccionados
  private cartService = inject(CartService)
  total = this.cartService.total;
  cart = this.cartService.cart;
  
  constructor(    
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog
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

  openModalCreateProduct(){
    const dialogo1 = this.dialog.open(CreateProductComponent, {
      data: new Product
    });

    dialogo1.afterClosed().subscribe(newProduct => {
      console.log('after Closed', newProduct);
      if (newProduct != undefined) {
        this.createProduct(newProduct)
      }
    });
  }


  createProduct(newProduct: Product){
    var token = this.authService.getToken();
    if (token != null){
      this.productService.createProduct(newProduct, token).subscribe({
        next: (response: string) => {
          console.log(response);
          this.router.navigate(['/list']);
        },
        error: (error) => {
          console.log('producto no creado', error); 
        }
      })
    }
  }

}
