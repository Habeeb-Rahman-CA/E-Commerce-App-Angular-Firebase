import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { auth, db } from '../firebase/firebaseConfig';
import { ICart } from '../model/user';
import { addDoc, collection, deleteDoc, getDocs, query, where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  isLoading: boolean = false


  getCurrentUser() {
    const currentUser = auth.currentUser
    return currentUser;
  }

  addToWishlist(userId: string, product: ICart) {
    const wishlistRef = collection(db, 'users', userId, 'wishlist')
    addDoc(wishlistRef, {
      id: product.id,
      name: product.name,
      imgUrl: product.imageUrl,
      category: product.categoty,
      price: product.price
    })
  }

  async getWishlist(userId: string) {
    const wishlistRef = collection(db, 'users', userId, 'wishlist')
    const snapshot = await getDocs(wishlistRef)
    return snapshot.docs.map(doc => {
      const data = doc.data()
      return {
        id: data['id'],
        name: data['name'],
        price: data['price'],
        imageUrl: data['imgUrl'],
        categoty: data['category']
      } as ICart
    })
  }

  async removeFromwishlist(userId: string, itemId: string) {
    const snapshot = await getDocs(query(collection(db, 'users', userId, 'wishlist'), where('id', '==', itemId)))
    const data = snapshot.docs[0]
    deleteDoc(data.ref)
  }
}
