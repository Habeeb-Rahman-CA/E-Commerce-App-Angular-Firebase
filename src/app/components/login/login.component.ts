import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, LoaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = ''
  password: string = ''

  auth = inject(AuthService)

  isLoading = this.auth.isLoading

  onLogin(){
    this.isLoading = true
    this.auth.login(this.email, this.password)
  }

}
