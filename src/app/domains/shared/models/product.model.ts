import { Category } from "./Category.model";

export class Product {
    id: number = 0;
    description: string = "";
    title: string = "";
    price: number = 0;
    listImages: string[] = [];
    creationAt: string = "";
    stock: number = 0 ;
    categoryId: number = 0 ;
    category: Category  = new Category;
}
