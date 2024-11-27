import { inject, Injectable, signal } from '@angular/core';
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Router } from '@angular/router';
import { IUser } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  router = inject(Router)

  constructor() { }

  isLogin = signal<boolean>(false)
  isLoading: boolean = false
  btnHome = signal<string>('Get Started')
  userEmail = signal<string>('')

  register(name: string, email: string, password: string, isRole: boolean) {
    createUserWithEmailAndPassword(auth, email, password).then((res) => {
      const user = res.user
      setDoc(doc(db, 'users', user.uid), {
        name: name,
        email: email,
        isRole: isRole
      })
      this.isLoading = false
      this.router.navigate(['/login'])
      this.btnHome.set('Back Home')
    }, err => {
      alert('Something went wrong')
      this.isLoading = false
      this.router.navigate(['/register'])
    })
  }

  login(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password).then((res) => {
      const user = res.user
      this.isLogin.set(true)
      getDoc(doc(db, 'users', user.uid)).then(res => {
        const userData = res.data()
        if (userData) {
          this.btnHome.set(userData['name'])
          this.userEmail.set(userData['email'])
          if (userData['isRole']) {
            this.isLoading = false
            this.router.navigate(['/admin-dashboard'])
          } else {
            this.isLoading = false
            this.router.navigate(['/products'])
          }
        }
      })
    }, err => {
      alert('User not found, please register')
    })
  }

  logout() {
    signOut(auth).then(() => {
      this.isLogin.set(false)
      this.btnHome.set('Get Started')
      this.router.navigate(['/home'])
    }, err => {
      alert('login unsuccessful')
    })
  }

  async getAllUsers(){
    const userRef = collection(db, 'users')
    const snapshot = await getDocs(userRef)
    return snapshot.docs.map(doc =>{
      const data = doc.data()
      return {
        uid: doc.id,
        name: data['name'],
        email:data['email'],
        isRole:data['isRole']
      } as IUser
    })
  }
}
