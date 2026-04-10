import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmB-o8afYWa4KWF-uS7RDjKxVNOYjq5Mc",
  authDomain: "cricket-tournament-6a617.firebaseapp.com",
  projectId: "cricket-tournament-6a617",
  storageBucket: "cricket-tournament-6a617.appspot.com",
  messagingSenderId: "899544200181",
  appId: "1:899544200181:web:f5432ee90031b97beaa6bc",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);