import { Injectable } from '@angular/core';
import { auth, db } from '../firebase/firebaseConfig';
import { IAddress, ICart, IOrder } from '../model/user';
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';

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

  async getCart(userId: string) {
    const cartRef = collection(db, 'users', userId, 'cart')
    const snapshot = await getDocs(cartRef)
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

  async removeFromCart(userId: string, itemId: string) {
    const snapshot = await getDocs(query(collection(db, 'users', userId, 'cart'), where('id', '==', itemId)))
    const data = snapshot.docs[0]
    deleteDoc(data.ref)
  }

  async checkout(userId: string, address: IAddress) {
    const cartItem = await this.getCart(userId)

    const orderDetails = {
      userId,
      address,
      items: cartItem,
      totalAmount: cartItem.reduce((total, item) => total + Number(item.price), 0)
    }

    const ordersRef = collection(db, 'orders')
    addDoc(ordersRef, orderDetails)

    alert('Your delivery address has been successfully added!')

    const cartRef = collection(db, 'users', userId, 'cart')
    const cartSnapshot = await getDocs(cartRef)

    for (const doc of cartSnapshot.docs) {
      deleteDoc(doc.ref)
    }
  }

  async getOrdersById(userId: string) {
    const orderRef = collection(db, 'orders')
    const snapshot = await getDocs(query(orderRef, where('userId', '==', userId)))
    return snapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        userId: data['userId'],
        address: data['address'],
        items: data['items'],
        totalAmount: data['totalAmount']
      } as IOrder
    })
  }

}