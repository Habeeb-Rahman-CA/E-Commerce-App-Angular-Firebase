import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  name: string = ''
  email: string = ''
  password: string = ''
  isRole: boolean = false

  auth = inject(AuthService)
  router = inject(Router)

  onRegister() {
    if (this.name == '', this.email == '', this.password == '') {
      alert("fill the blanks")
    } else {
      this.auth.register(this.name, this.email, this.password, this.isRole)
    }
    this.name = ''
    this.email = ''
    this.password = ''
  }
}
