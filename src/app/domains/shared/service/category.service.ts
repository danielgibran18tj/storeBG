import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Category } from '@shared/models/Category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private http = inject(HttpClient);

  constructor() { }

  
  getAll(token?: string){

    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

    // return this.http.get<Category[]>('http://192.168.68.55:8080/api/v1/categories');
    return this.http.get<Category[]>('http://localhost:5024/api/categories', {headers});
    // return this.http.get<Category[]>(`https://api.escuelajs.co/api/v1/categories`);
  }
}
