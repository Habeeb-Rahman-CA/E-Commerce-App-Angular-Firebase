import { Component, inject, OnInit } from '@angular/core';
import { LoaderComponent } from "../loader/loader.component";
import { WishlistService } from '../../services/wishlist.service';
import { ICart } from '../../model/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [LoaderComponent, CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {

  wishlistItem: ICart[] = []

  wishlistService = inject(WishlistService)

  isLoading = this.wishlistService.isLoading

  ngOnInit(): void {
      this.getAllWishlistItems()
  }

  async getAllWishlistItems() {
    const currentUser = this.wishlistService.getCurrentUser()
    this.isLoading = true
    if (currentUser) {
      const userId = currentUser.uid
      this.wishlistItem = await this.wishlistService.getWishlist(userId)
    }
    this.isLoading = false
  }

  deleteItemFromCart(itemId: string) {
    const currentUser = this.wishlistService.getCurrentUser()
    if (currentUser) {
      const userId = currentUser.uid
      const confirmDelete = window.confirm("Are you really want to remove this item from your wishlist?")
      if (confirmDelete) {
        this.wishlistService.removeFromwishlist(userId, itemId)
        alert("Removed item from your wishlist");
        this.getAllWishlistItems()
      } else {
        alert('cancelled removing the item')
      }
    }
  }

}
