import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);

  constructor() { }

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
    var token = localStorage.getItem('authToken')
    
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

    return this.http.get<Product>(`http://localhost:5024/api/getProductId/${id}`, {headers});
    // return this.http.get<Product>(`https://api.escuelajs.co/api/v1/products/${id}`);
  }
}
