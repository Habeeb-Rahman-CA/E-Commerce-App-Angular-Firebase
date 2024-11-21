import { Component, inject, OnInit } from '@angular/core';
import { IProducts } from '../../model/user';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {

  product: IProducts | null = null

  activateRoute = inject(ActivatedRoute)
  productService = inject(ProductsService)

  ngOnInit(): void {
    const productId = this.activateRoute.snapshot.paramMap.get('id')
    if (productId) {
      this.productService.getProductById(productId).then(product => {
        this.product = product
        console.log(this.product);
      }).catch(err => {
        alert('Error while fetching');
      })
    }
  }
}

