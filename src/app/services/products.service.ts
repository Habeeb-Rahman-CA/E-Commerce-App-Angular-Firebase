import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { IProducts } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  addProducts(products: IProducts) {
    addDoc(collection(db, "products"), {
      id: products.productId,
      name: products.productName,
      description: products.productDesc,
      price: products.productPrice,
      categoty: products.productCategory,
      imageUrl: products.productImgUrl
    })
  }

  async getAllProducts() {
    const snapshot = await getDocs(collection(db, 'products'))
    const products: IProducts[] = snapshot.docs.map(doc => {
      const data = doc.data()
      return {
        productId: data['id'],
        productName: data['name'],
        productDesc: data['description'],
        productPrice: data['price'],
        productCategory: data['categoty'],
        productImgUrl: data['imageUrl']
      } as IProducts
    })
    return products
  }

  async deleteProducts(id: string) {
    const snapshot = await getDocs(query(collection(db, 'products'), where("id", "==", id)))
    const productDoc = snapshot.docs[0]
    deleteDoc(productDoc.ref)
  }

  async getProductById(id: string): Promise<IProducts | null> {
    const snapshot = await getDocs(query(collection(db, 'products'), where("id", "==", id)))
    const productDoc = snapshot.docs[0]
    return productDoc.data() as IProducts
  }
}
