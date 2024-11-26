import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { IOrder } from '../../model/user';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent implements OnInit {

  cartService = inject(CartService)
  orders: IOrder[] = []

  ngOnInit(): void {
      this.getAllOrders()
  }

 async getAllOrders(){
    this.orders = await this.cartService.getAllOrders()
  }

}
