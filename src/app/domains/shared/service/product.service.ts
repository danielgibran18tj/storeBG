import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);
  selectedProducts: Array<number> = new Array();
  constructor() { }
  
  getProducts(category_id?: string){
    var url = new URL(`http://localhost:5024/api/getProducts`)
    
    if(category_id){
      url.searchParams.set('categoryId', category_id)
    }

    return this.http.get<Product[]>(url.toString(), { observe: 'response' });
  }
  
  getProductSelect(){
    var url = new URL(`http://localhost:5024/api/getProductsSelect`);
    const storedProducts = localStorage.getItem('selectedProducts');
    
    if (storedProducts) {
      // Convertir el Set a Array
      this.selectedProducts = Array.from(JSON.parse(storedProducts));
    }

    console.log(this.selectedProducts); // Verificar que estamos enviando un array

    // Crear un objeto para enviar que coincida con el modelo ProductSelectRequest en .NET
    const requestPayload = {
      selectedProductIds: this.selectedProducts
    };

    return this.http.post<Product[]>(url.toString(), requestPayload, { observe: 'response' });
}



  getOne(id: string){
    return this.http.get<Product>(`http://localhost:5024/api/getProductId/${id}`);
  }
}
