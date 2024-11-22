import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {

  product: any
  
  auth = inject(AuthService)
  activateRoute = inject(ActivatedRoute)
  productService = inject(ProductsService)
  router = inject(Router)

  isLogin = this.auth.isLogin

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

  goToCart(){
    if(this.isLogin()){
      this.router.navigate(['/my-cart'])
    } else {
      alert("Your not logged in yet")
      this.router.navigate(['/login'])
    }
  }

  addToCart(){
    if (this.isLogin()) {
      alert('added to cart')
    } else {
      alert('your not logged in yet')
    }
  }
}

