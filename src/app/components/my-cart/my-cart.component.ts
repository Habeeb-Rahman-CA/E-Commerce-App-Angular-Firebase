import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ICart } from '../../model/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './my-cart.component.html',
  styleUrl: './my-cart.component.css'
})
export class MyCartComponent implements OnInit {

  cartService = inject(CartService)
  cartList: ICart[] = []
  totalPrice: number = 0

  ngOnInit(): void {
    this.getAllCartItems()
  }

  async getAllCartItems() {
    const currentUser = this.cartService.getCurrentUser()
    if (currentUser) {
      const userId = currentUser.uid
      this.cartList = await this.cartService.getCart(userId)
      this.totalPrice = this.cartList.reduce((total, item) => total + Number(item.price), 0)
    }
  }

  deleteItemFromCart(itemId: string){
    const currentUser = this.cartService.getCurrentUser()
    if (currentUser) {
      const userId = currentUser.uid
      this.cartService.removeFromCart(userId, itemId)
      console.log("Removed item from your cart");
      this.getAllCartItems()
    }
  }
}
