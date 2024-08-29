import { CommonModule } from '@angular/common';
import { Component, Input, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '@shared/models/product.model';
import { CartService } from '@shared/service/cart.service';
import { ProductService } from '@shared/service/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export default class ProductDetailComponent {

  @Input() id?: string;
  selectedProducts: Set<number> = new Set();
  product = signal<Product | null>(null)
  cover = signal('');
  private productService = inject(ProductService);

  ngOnInit(): void {
    console.log("entramos al details ");
    if (this.id) {
      console.log(this.id);
      this.productService.getOne(this.id).subscribe({
        next: (product) => {
          console.log(product);
          this.product.set(product);
          this.cover.set(product.images);
        },
        error: () => {
          console.log('algo no salio bien');
          this.router.navigate(['/errorss']);
          alert("Hubo un error con la lista de productos")

        }
      })
    }
  }

  constructor(
    private router: Router,
  ) {
    this.loadSelectedProducts();
  }

  private loadSelectedProducts() {
    const storedProducts = localStorage.getItem('selectedProducts');
    if (storedProducts) {
      this.selectedProducts = new Set(JSON.parse(storedProducts));
    }
  }

  changeCover(image: string) {
    this.cover.set(image)
  }

  isSelected(): boolean {
    const producto = this.product();
    if (producto) {
      return this.selectedProducts.has(producto.id);
    }
    return false;
  }

  addToSelect() {
    const producto = this.product();
    if (producto) {
      if (this.selectedProducts.has(producto.id)) {
        this.selectedProducts.delete(producto.id);
      } else {
        this.selectedProducts.add(producto.id);
      }
      this.updateLocalStorage();
    }
  }


  // Actualizar el localStorage con productos seleccionados
  private updateLocalStorage() {
    localStorage.setItem('selectedProducts', JSON.stringify(Array.from(this.selectedProducts)));
  }

}
