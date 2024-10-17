import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../models/product.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);

  constructor(private authService: AuthService,) { }

  // https://fakeapi.platzi.com/en/rest/products/
  
  getProducts(category_id?: string, token?: string){
    var url = new URL(`http://localhost:5024/api/getProducts`)
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

    return this.http.get<Product>(`http://localhost:5024/api/getProductId/${id}`, {headers});
    // return this.http.get<Product>(`https://api.escuelajs.co/api/v1/products/${id}`);
  }


  createProduct(product: Product, token: string){
    var url = new URL(`http://localhost:5024/api/createProduct`)
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

    return this.http.post(url.toString(), product, { headers, responseType: 'text' });

  }
}
