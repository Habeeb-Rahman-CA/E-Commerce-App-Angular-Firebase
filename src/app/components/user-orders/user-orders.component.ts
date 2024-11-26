import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { IOrder } from '../../model/user';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-orders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.css'
})
export class UserOrdersComponent implements OnInit {

  orders: IOrder[] = []

  cartService = inject(CartService)

  ngOnInit(): void {
  this.getOrderByUser()
  }

  async getOrderByUser(){
    const currentUser = this.cartService.getCurrentUser()
    if (currentUser) {
      this.orders = await this.cartService.getOrdersById(currentUser.uid)  
    }
    
  }

  
}
