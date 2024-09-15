import { Component, Input, SimpleChanges, inject, signal } from '@angular/core';
import { ProductComponent } from '../../components/product/product.component';
import { Product } from '../../../shared/models/product.model';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@shared/components/header/header.component';
import { CartService } from '@shared/service/cart.service';
import { ProductService } from '@shared/service/product.service';
import { CategoryService } from '@shared/service/category.service';
import { Category } from '@shared/models/Category.model';
import { Router, RouterLinkWithHref } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';



@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ProductComponent, CommonModule, HeaderComponent, RouterLinkWithHref, MatPaginatorModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  img = 'https://picsum.photos/640/640?r=' + Math.random()
  rolActual = localStorage.getItem('authRol');
  tokenActual = localStorage.getItem('authToken') ?? "";
  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  categorySeleccionada: number = 0;
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  pageSize = 10; // Número de elementos por página
  currentPage = 0; // Página actual

  // withComponentInputBinding() usado en app.config, gracias a este recibe el parametro
  @Input() category_id?: string;

  constructor(   
    private router: Router,
  ) {
    const initProducts: Product[] = []; 
    this.products.set(initProducts);
  }


  ngOnInit(): void {
    console.log("entrando a ngOnInit");
    console.log(this.rolActual);
    this.getCategories();
  }
  
  
  ngOnChanges(changes: SimpleChanges): void {
    const category_id = changes['category_id']
    if (category_id) {
      console.log("entrando a ngOnChanges");
      this.getProducts()
    }
    this.currentPage = 0
  }


  obtenerProductosPaginados(page: number): any[] {
    const startIndex = page * this.pageSize;
    
    // Obtén los productos paginados usando el método slice
    const paginatedProducts = this.products().slice(startIndex, startIndex + this.pageSize);
    return paginatedProducts;
  }


  addToCart(product: Product) {
    console.log('recibiendo producto')
    this.cartService.addToCart(product)
  }


  getProducts() {
    console.log('category_id', this.category_id);

    this.productService.getProducts(this.category_id, this.tokenActual).subscribe({
      next: (response: HttpResponse<Product[]>) => {
        if(response.status === 200 ){
          this.products.set(response.body || []);
          console.log(response.body);
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log('algo no salio bien', error);
        alert("Posiblemente alla caducado su sesion")
        if (error.status === 401) {
          this.router.navigate(['/login'])
        }  
      }
    })
  }


  getCategories() {
    this.categoryService.getAll(this.tokenActual).subscribe({
      next: (data) => {
        this.categories.set(data);
        console.log(data);
      },
      error: () => {
        console.log('algo no salio bien');
      }
    })
  }


}
