import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ICart, IProducts } from '../../model/user';
import { CartService } from '../../services/cart.service';
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, LoaderComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {

  product: any
  
  auth = inject(AuthService)
  activateRoute = inject(ActivatedRoute)
  productService = inject(ProductsService)
  cartService = inject(CartService)
  router = inject(Router)

  isLogin = this.auth.isLogin
  isLoading = this.productService.isLoading

  ngOnInit(): void {
    this.isLoading = true
    const productId = this.activateRoute.snapshot.paramMap.get('id')
    if (productId) {
      this.productService.getProductById(productId).then(product => {
        this.product = product
        this.isLoading = false
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

  addToCart(cartItems: any){
    if (this.isLogin()) {
      const currentUser = this.cartService.getCurrentUser()
      if (currentUser) {
        const userId = currentUser.uid
        this.cartService.addToCart(userId, cartItems)
        alert("cart added")
      }
    } else {
      alert('your not logged in yet')
    }
  }
}

