import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { IProducts } from '../../model/user';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LoaderComponent } from "../loader/loader.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, LoaderComponent, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  productService = inject(ProductsService)
  router = inject(Router)

  productList: IProducts[] = []
  filteredProducts: IProducts[] = []

  categories: string[] =['Shirts','Jeans','Sweaters & Hoodies','Polos','T-Shirt & Tops','Underwear'] 

  selectedCategory: string = ''
  searchQuery: string = ''
  sort: 'asc'|'desc'= 'asc'

  isLoading = this.productService.isLoading

  ngOnInit(): void {
    this.getProducts()
  }

  async getProducts() {
    this.isLoading = true
    this.productList = await this.productService.getAllProducts()
    this.filteredProducts = [...this.productList]
    this.isLoading = false
  }

  toProductDetail(id: string){
    this.router.navigate(['/product-detail', id])
  }

  filteredByCategory(){
    this.filteredProducts = this.productList.filter((product) =>{
      return this.selectedCategory ? product.productCategory === this.selectedCategory : true
    })
    this.searchProducts()
    this.sortProducts()
  }

  searchProducts(){
    this.filteredProducts = this.filteredProducts.filter((product) => {
      return product.productName.toLowerCase().includes(this.searchQuery.toLowerCase())
    })
  }

  sortProducts(){
    this.filteredProducts = [...this.filteredProducts].sort((a, b) => {
      return this.sort === 'asc' ? a.productPrice - b.productPrice : b.productPrice - a.productPrice
    })
  }

  applyFilter(){
    this.filteredProducts = [...this.productList]
    this.filteredByCategory()
    this.searchProducts()
    this.sortProducts()
  }

}
