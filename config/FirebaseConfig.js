// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "novelapplication-92673.firebaseapp.com",
  projectId: "novelapplication-92673",
  storageBucket: "novelapplication-92673.appspot.com",
  messagingSenderId: "242872535632",
  appId: "1:242872535632:web:2cc6179656c8df184edf55",
  measurementId: "G-Q80B6GZWV4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
export const storage=getStorage(app)
//const analytics = getAnalytics(app);