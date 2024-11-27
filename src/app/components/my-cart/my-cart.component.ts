import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { IAddress, ICart } from '../../model/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: 'app-my-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, LoaderComponent],
  templateUrl: './my-cart.component.html',
  styleUrl: './my-cart.component.css'
})
export class MyCartComponent implements OnInit {

  router = inject(Router)
  cartService = inject(CartService)
  cartList: ICart[] = []
  totalPrice: number = 0
  address: IAddress = {
    street: '',
    landmark: '',
    city: '',
    pincode: ''
  }

  isLoading = this.cartService.isLoading

  ngOnInit(): void {
    this.getAllCartItems()
  }

  async getAllCartItems() {
    const currentUser = this.cartService.getCurrentUser()
    this.isLoading = true
    if (currentUser) {
      const userId = currentUser.uid
      this.cartList = await this.cartService.getCart(userId)
      this.totalPrice = this.cartList.reduce((total, item) => total + Number(item.price), 0)
    }
    this.isLoading = false
  }

  deleteItemFromCart(itemId: string) {
    const currentUser = this.cartService.getCurrentUser()
    if (currentUser) {
      const userId = currentUser.uid
      const confirmDelete = window.confirm("Are you really want to remove this item from your cart?")
      if (confirmDelete) {
        this.cartService.removeFromCart(userId, itemId)
        alert("Removed item from your cart");
        this.getAllCartItems()
      } else {
        alert('cancelled removing the item')
      }
    }
  }

  checkoutCart() {
    if (this.cartList.length == 0) {
      alert('Your cart is empty')
    } else if (this.address.street == '' && this.address.landmark == '' && this.address.city == '' && this.address.pincode == '') {
      alert('Fill your address')
    } else {
      const currentUser = this.cartService.getCurrentUser()
      if (currentUser) {
        this.cartService.checkout(currentUser.uid, this.address)
        this.router.navigate(['/payment'])
      }
    }
  }
}
