import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Product } from '@shared/models/product.model';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [FormsModule, MatDialogModule, CommonModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent {
  imagePreview: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<CreateProductComponent>,
    @Inject(MAT_DIALOG_DATA) public productNew: Product
  ) {}

  onClose() {
    this.dialogRef.close();
  }

  addImageFromUrl() {
    console.log('addImageFromUrl');    
    if (this.imagePreview) {
      this.productNew.listImages.push(this.imagePreview)
      this.imagePreview = ""
    }
    console.log(this.productNew);
    
  }

  changeCover(image: string){
    this.imagePreview = image
  }
}
