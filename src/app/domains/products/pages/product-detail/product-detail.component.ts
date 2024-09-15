import { CommonModule } from '@angular/common';
import { Component, Input, inject, signal } from '@angular/core';
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

  // withComponentInputBinding() =>  importante señalar que este input viene desde listComponent
  // , pero gracias a esta funcionalidad escrita en 'app.cofig'
  @Input() id?: string;

  product = signal<Product | null>(null)
  cover = signal('');
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  ngOnInit(): void {
    console.log("entramos al details ");
    if(this.id){
      console.log(this.id);
      this.productService.getOne(this.id).subscribe({
        next: (product) => {
          console.log(product);
          this.product.set(product);
          if(product.listImages.length > 0) {
            this.cover.set(product.listImages[0]);
          }
        }
      })
    }
  }

  changeCover(image: string){
    this.cover.set(image)
  }

  addToCart(){
    const producto = this.product();
    if(producto){
      this.cartService.addToCart(producto);
    }
  }

}
