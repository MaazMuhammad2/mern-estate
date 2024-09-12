// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estate-mern-d5dc8.firebaseapp.com",
  projectId: "estate-mern-d5dc8",
  storageBucket: "estate-mern-d5dc8.appspot.com",
  messagingSenderId: "936319962291",
  appId: "1:936319962291:web:4b1f9061d567656e01b4c6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);