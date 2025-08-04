import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../models/product.model';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;  // Usar la URL de la API según el entorno

  constructor(private authService: AuthService,) { }

  // https://fakeapi.platzi.com/en/rest/products/
  
  getProducts(category_id?: string, token?: string){
    var url = new URL(`${this.apiUrl}/getProducts`)
    // var url = new URL(`https://api.escuelajs.co/api/v1/products`)
    
    if(category_id){
      url.searchParams.set('categoryId', category_id)
    }
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

    return this.http.get<Product[]>(url.toString(), { headers, observe: 'response' });
  }


  getOne(id: string){
    var token = this.authService.getToken();
    // var token = localStorage.getItem('authToken')
    
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

    return this.http.get<Product>(`${this.apiUrl}/getProductId/${id}`, {headers});
    // return this.http.get<Product>(`https://api.escuelajs.co/api/v1/products/${id}`);
  }


  createProduct(product: Product, token: string){
    var url = new URL(`${this.apiUrl}/createProduct`)
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

    return this.http.post(url.toString(), product, { headers, responseType: 'text' });

  }
}
