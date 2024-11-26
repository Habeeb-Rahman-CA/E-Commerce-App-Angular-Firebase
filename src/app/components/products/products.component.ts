import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { IProducts } from '../../model/user';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { GalleriaPrimeComponent } from "../galleria-prime/galleria-prime.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, GalleriaPrimeComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  productService = inject(ProductsService)
  router = inject(Router)

  productList: IProducts[] = []

  ngOnInit(): void {
    this.getProducts()
  }

  async getProducts() {
    this.productList = await this.productService.getAllProducts()
  }

  toProductDetail(id: string){
    this.router.navigate(['/product-detail', id])
  }

}
