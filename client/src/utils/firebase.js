// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "control-hub-73c71.firebaseapp.com",
  projectId: "control-hub-73c71",
  storageBucket: "control-hub-73c71.firebasestorage.app",
  messagingSenderId: "368792638771",
  appId: "1:368792638771:web:0b8c68cc85550829a8da46",
  measurementId: "G-VSK77P93MC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);