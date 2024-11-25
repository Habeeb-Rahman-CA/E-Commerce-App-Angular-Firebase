import { Injectable } from '@angular/core';
import { auth, db } from '../firebase/firebaseConfig';
import { ICart } from '../model/user';
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

  addToCart(userId: string, product: ICart) {
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
    return snapshot.docs.map(doc =>{
      const data = doc.data()
      return{
        id:data['id'],
        name:data['name'],
        price:data['price'],
        imageUrl:data['imgUrl'],
        categoty:data['category']
      } as ICart
    })
  }

  async removeFromCart(userId: string, itemId: string){
    const itemRef = doc(db, 'users', userId, 'cart', itemId)
    await deleteDoc(itemRef)
  }
}