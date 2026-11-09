// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2rwUyN-KQE-FspJG0YJcgssyiBpcAOsI",
  authDomain: "zynova-42de0.firebaseapp.com",
  projectId: "zynova-42de0",
  storageBucket: "zynova-42de0.firebasestorage.app",
  messagingSenderId: "488967186213",
  appId: "1:488967186213:web:33b9404ae6605d7c499ccc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const auth = getAuth(app);
export const db = getFirestore(app);
