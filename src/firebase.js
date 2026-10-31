// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfT8QVss0zvSASW_OQsiHqd9-s3QyRNgM",
  authDomain: "my-portfolio-96dca.firebaseapp.com",
  projectId: "my-portfolio-96dca",
  storageBucket: "my-portfolio-96dca.firebasestorage.app",
  messagingSenderId: "446692295196",
  appId: "1:446692295196:web:9cb21de142fa03135655d9"
};

// Init Firebase
const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const loginWithGoogle = () => signInWithPopup(auth, provider);
export const logout = () => signOut(auth);

// Firestore
export const db = getFirestore(app);
