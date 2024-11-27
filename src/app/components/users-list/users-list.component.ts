import { Component, inject, OnInit } from '@angular/core';
import { IUser } from '../../model/user';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [RouterModule, LoaderComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit {

  users : IUser[] = []
  authService = inject(AuthService)
  isLoading: boolean = false

  ngOnInit(): void {
      this.getAllUsers()
  }

  async getAllUsers(){
    this.isLoading = true
    this.users = await this.authService.getAllUsers()
    this.isLoading = false
  }

}
