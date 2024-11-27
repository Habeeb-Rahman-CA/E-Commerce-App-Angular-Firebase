import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { IOrder } from '../../model/user';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: 'app-user-orders',
  standalone: true,
  imports: [CommonModule, RouterModule, LoaderComponent],
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.css'
})
export class UserOrdersComponent implements OnInit {

  orders: IOrder[] = []

  cartService = inject(CartService)

  isLoading = this.cartService.isLoading

  ngOnInit(): void {
  this.getOrderByUser()
  }

  async getOrderByUser(){
    const currentUser = this.cartService.getCurrentUser()
    this.isLoading = true
    if (currentUser) {
      this.orders = await this.cartService.getOrdersById(currentUser.uid)  
    }
    this.isLoading = false
  }

  
}
