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

  isRegister: boolean = true
  btnText = signal('Sign In')

  toggleRegister() {
    this.isRegister = !this.isRegister
    if (this.isRegister) {
      this.btnText.set('Sign In')
      this.router.navigate(['/home'])
    } else if (!this.isRegister) {
      this.btnText.set('Back Home')
      this.router.navigate(['/register'])
    }
  }
}
