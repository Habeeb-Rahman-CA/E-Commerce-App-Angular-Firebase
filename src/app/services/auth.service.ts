import { inject, Injectable } from '@angular/core';
import { addDoc, collection, doc, getDoc, query, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { IUser } from '../model/user';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userRef = (collection(db, 'users'))
  router = inject(Router)

  constructor() { }

  register(name: string, email: string, password: string, isRole: boolean) {
    createUserWithEmailAndPassword(auth, email, password).then((res) => {
      const user = res.user
      setDoc(doc(db, 'users', user.uid),{
        name:name,
        email:email,
        isRole: isRole
      })
      this.router.navigate(['/login'])
    }, err => {
      alert('Something went wrong')
      this.router.navigate(['/register'])
    })
  }

  login(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password).then((res) => {
      const user = res.user
      getDoc(doc(db, 'users', user.uid)).then(res =>{
          const userData = res.data()
          if (userData) {
            if (userData['isRole']) {
              this.router.navigate(['/admin-dashboard'])
            } else {
              this.router.navigate(['/products'])
            }
          }
      })
    }, err =>{
      alert('User not found, please register')
    })
  }

}
