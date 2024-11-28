import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IProducts } from '../../model/user';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-add-products',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.css'
})
export class AddProductsComponent {

  productService = inject(ProductsService)

  products: IProducts = {
    productId: new Date().toString(),
    productName: '',
    productDesc: '',
    productPrice: 0,
    productCategory: '',
    productImgUrl: 'https://www.shutterstock.com/image-vector/upload-document-data-file-cloud-600nw-2297720825.jpg'
  }

  addProducts(productForm: NgForm) {
    this.productService.addProducts(this.products)
    productForm.resetForm()
  }

  onDragOver(event: DragEvent) {
    event.preventDefault()
  }

  onDrop(event: DragEvent) {
    event.preventDefault()
    if (event.dataTransfer?.files) {
      this.addFile(event.dataTransfer?.files)
    }
  }

  addFile(file: FileList) {
    for (let i = 0; i < file.length; i++) {
      if (file[i].type.startsWith('image/')) {
        const imageUrl = URL.createObjectURL(file[i])
        this.products.productImgUrl = imageUrl
      }
    }
  }

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement
    if (input.files) {
      this.addFile(input.files)
    }
  }
}
