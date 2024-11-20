import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  name: string = ''
  email: string = ''
  password: string = ''

  auth = inject(AuthService)
  router = inject(Router)

  onRegister(){
    this.name = ''
    this.email = ''
    this.password = ''
  }
}
