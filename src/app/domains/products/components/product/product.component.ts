import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../shared/models/product.model';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {     // estamos en el hijo
  
  @Input() title : string = '';
  @Input() price : number = 0;
  @Input({required: true}) img : string = ''; // comunica desde el padre hacia el hijo
  @Input() product! : Product

  @Output() addToCart = new EventEmitter();   // comunica desde el hijo hacia el padre

  selectedProducts: Set<number> = new Set();

  addToCartHandler() {
    if (this.selectedProducts.has(this.product.id)) {
      this.selectedProducts.delete(this.product.id);
    } else {
      this.selectedProducts.add(this.product.id);
    }
    this.updateLocalStorage();
    this.addToCart.emit(this.product);
  }
  
	constructor() {
    this.loadSelectedProducts();
	}

  isSelected(productId: number): boolean {
    return this.selectedProducts.has(productId);
  }

   // Cargar productos seleccionados desde el localStorage
   private loadSelectedProducts() {
    const storedProducts = localStorage.getItem('selectedProducts');
    if (storedProducts) {
      this.selectedProducts = new Set(JSON.parse(storedProducts));
    }
  }

  // Actualizar el localStorage con productos seleccionados
  private updateLocalStorage() {
    localStorage.setItem('selectedProducts', JSON.stringify(Array.from(this.selectedProducts)));
  }
}
