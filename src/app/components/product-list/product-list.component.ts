import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { IProducts } from '../../model/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  productService = inject(ProductsService)

  productList: IProducts[] = []

  ngOnInit(): void {
      this.getAllProducts()
  }

  async getAllProducts(){
    this.productList = await this.productService.getAllProducts()
  }

}
