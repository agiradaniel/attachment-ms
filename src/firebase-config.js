// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBm8k4kCN1T2GqK6iN5CnAJ7Agn_4tfhYQ",
  authDomain: "attachment-ms.firebaseapp.com",
  projectId: "attachment-ms",
  storageBucket: "attachment-ms.appspot.com",
  messagingSenderId: "340912582183",
  appId: "1:340912582183:web:753d6f9d2a73bbbc8aa802"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();