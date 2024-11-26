import { Component, inject, OnInit } from '@angular/core';
import { IUser } from '../../model/user';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit {

  users : IUser[] = []
  authService = inject(AuthService)

  ngOnInit(): void {
      this.getAllUsers()
  }

  async getAllUsers(){
    this.users = await this.authService.getAllUsers()
  }

}
