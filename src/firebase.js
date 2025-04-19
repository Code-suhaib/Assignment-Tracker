// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBJVTlPyn8FWgkl20qM1_5MdiDa0Q_P6i0",
  authDomain: "assignment-tracker-2bee6.firebaseapp.com",
  projectId: "assignment-tracker-2bee6",
  storageBucket: "assignment-tracker-2bee6.appspot.com",
  messagingSenderId: "655309903867",
  appId: "1:655309903867:web:dd1da5564a4f7bfc5d1d5e",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
