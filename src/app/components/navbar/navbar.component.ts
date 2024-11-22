import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  router = inject(Router)

  auth = inject(AuthService)

  btnHome = this.auth.btnHome

  isRegister: boolean = false

  isLogin = this.auth.isLogin

  toggleRegister() {
    this.isRegister = !this.isRegister
    if (this.isRegister) {
      this.router.navigate(['/register'])
      this.btnHome.set('Back Home')
    } else if (!this.isRegister) {
      this.router.navigate(['/home'])
      this.btnHome.set('Get Started')
    }
  }

  toggleUser(){
    this.router.navigate(['/user-dashboard'])
  }

  logout(){
    this.auth.logout()
  }

  
}
