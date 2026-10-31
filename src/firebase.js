// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDOwZynwiHmZuAxzMze0y_MaGerj2vGLjI",
  authDomain: "my-portfolio-d651d.firebaseapp.com",
  projectId: "my-portfolio-d651d",
  storageBucket: "my-portfolio-d651d.firebasestorage.app",
  messagingSenderId: "156625686832",
  appId: "1:156625686832:web:c5f0d40bf2a67fa60c38f5"
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
