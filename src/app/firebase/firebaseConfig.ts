import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC1wj6xuPNtdBgvlQxG8FXgeyM6E2hkAYg",
    authDomain: "ecommerceappangular.firebaseapp.com",
    projectId: "ecommerceappangular",
    storageBucket: "ecommerceappangular.firebasestorage.app",
    messagingSenderId: "330359485270",
    appId: "1:330359485270:web:ba644b6c53ec1da5f25cf7"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)