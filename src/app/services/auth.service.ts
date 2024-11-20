import { Injectable } from '@angular/core';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  register(name: string, email: string, password: string){
    createUserWithEmailAndPassword(auth, email, password)
  }

}
