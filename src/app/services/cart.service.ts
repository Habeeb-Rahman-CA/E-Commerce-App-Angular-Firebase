import { Injectable } from '@angular/core';
import { auth, db } from '../firebase/firebaseConfig';
import { ICart, IProducts } from '../model/user';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  getCurrentUser() {
    const currentUser = auth.currentUser
    return currentUser;
  }

  addToCart(userId: string, product: any) {
    const cartRef = collection(db, 'users', userId, 'cart')
    addDoc(cartRef, {
      id: product.id,
      name: product.name,
      imgUrl: product.imageUrl,
      category: product.categoty,
      price: product.price
    })
  }

  async getCart(userId: string){
    const cartRef = collection(db, 'users', userId, 'cart')
    const snapshot = await getDocs(cartRef)
    const cartItem = snapshot.docs.map(doc => doc.data())
    return cartItem
  }

  removeFromCart(userId: string, itemId: string){
    const itemRef = doc(db, 'users', userId, 'cart', itemId)
    deleteDoc(itemRef)
  }
}
