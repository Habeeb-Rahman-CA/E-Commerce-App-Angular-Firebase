import { Injectable } from '@angular/core';
import { addDoc, collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { IProducts } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  addProducts(products: IProducts) {
    addDoc(collection(db, "products"), {
      name: products.productName,
      description: products.productDesc,
      price: products.productPrice,
      categoty: products.productCategory,
      imageUrl: products.productImgUrl
    })
  }

  async getAllProducts() {
    const snapshot = await getDocs(collection(db, 'products'))
    const products:IProducts[] = snapshot.docs.map(doc => {
      const data = doc.data()
      return{
        productName: data['name'],
        productDesc: data['description'],
        productPrice: data['price'],
        productCategory: data['categoty'],
        productImgUrl: data['imageUrl']
      } as IProducts
    })
    return products
  }
}

