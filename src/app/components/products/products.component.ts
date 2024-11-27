import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { IProducts } from '../../model/user';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, LoaderComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  productService = inject(ProductsService)
  router = inject(Router)

  productList: IProducts[] = []

  isLoading = this.productService.isLoading

  ngOnInit(): void {
    this.getProducts()
  }

  async getProducts() {
    this.isLoading = true
    this.productList = await this.productService.getAllProducts()
    this.isLoading = false
  }

  toProductDetail(id: string){
    this.router.navigate(['/product-detail', id])
  }

}
