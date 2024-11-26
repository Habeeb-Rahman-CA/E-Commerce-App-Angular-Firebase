import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {

  router = inject(Router)

  payment: string = ''

  proceedPayment(){
   const paymentConfirm = window.confirm(`Are you sure you want to confirm the payment using ${this.payment}?`)
   if (paymentConfirm) {
    alert(`Thank you for your payment! You have chosen [${this.payment}] as your payment option. Your transaction is being processed, and you will receive a confirmation email shortly.`)
    this.router.navigate(['/products'])
   }
  }

}
