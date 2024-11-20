import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  router = inject(Router)

  isRegister: boolean = false
  btnText = signal('Get Started')

  toggleRegister() {
    this.isRegister = !this.isRegister
    if (this.isRegister) {
      this.router.navigate(['/register'])
      this.btnText.set('Back Home')
    } else if (!this.isRegister) {
      this.router.navigate(['/home'])
      this.btnText.set('Get Started')
    }
  }
}
