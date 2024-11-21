import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IProducts } from '../../model/user';

@Component({
  selector: 'app-add-products',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.css'
})
export class AddProductsComponent {

  products: IProducts = {
    productName: '',
    productDesc: '',
    productPrice: null,
    productCategory: '',
    productImgUrl: ''
  }
  
  addProducts(){
    console.log(this.products);
  }


}
