// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfg48A44qIm1U83cdCfP6hEQN1gc9XzpI",
  authDomain: "strobotsite.firebaseapp.com",
  projectId: "strobotsite",
  storageBucket: "strobotsite.appspot.com",
  messagingSenderId: "826236243860",
  appId: "1:826236243860:web:fa89d65b4fc7abacf80981",
  measurementId: "G-MCB3FL4G22"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);