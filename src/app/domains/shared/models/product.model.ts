import { Category } from "./Category.model";

export interface Product {
    id: number;
    description: string;
    title: string;
    price: number;
    listImages: string[];
    creationAt: string;
    category: Category;
}
