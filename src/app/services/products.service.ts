import { Injectable } from '@angular/core';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { IProducts } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  productRef = (collection(db, "products"))

  addProducts(products: IProducts){
    addDoc(collection(db, "products"), {
      name: products.productName,
      description: products.productDesc,
      price: products.productPrice,
      categoty: products.productCategory,
      imageUrl: products.productImgUrl
    })
  }

}
