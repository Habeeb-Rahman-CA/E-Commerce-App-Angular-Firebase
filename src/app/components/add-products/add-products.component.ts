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
    productName: '',
    productDesc: '',
    productPrice: null,
    productCategory: '',
    productImgUrl: ''
  }
  
  addProducts(productForm: NgForm){
    this.productService.addProducts(this.products)
    productForm.resetForm()
  }


}
