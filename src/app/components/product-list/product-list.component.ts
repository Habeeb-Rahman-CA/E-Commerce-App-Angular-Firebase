import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { IProducts } from '../../model/user';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterModule, CommonModule, LoaderComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  productService = inject(ProductsService)
  isLoading = this.productService.isLoading

  productList: IProducts[] = []

  ngOnInit(): void {
      this.getAllProducts()
  }

  async getAllProducts(){
    this.isLoading = true
    this.productList = await this.productService.getAllProducts()
    this.isLoading = false
  }

  deleteProduct(id: string){
    this.productService.deleteProducts(id)
    this.getAllProducts()
  }

}
