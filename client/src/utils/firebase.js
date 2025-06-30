// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGQvie__zk-ohKft6rSDHN0_ItndW_OxE",
  authDomain: "controlhub-mern.firebaseapp.com",
  projectId: "controlhub-mern",
  storageBucket: "controlhub-mern.firebasestorage.app",
  messagingSenderId: "831801411064",
  appId: "1:831801411064:web:c165bbf2ca271fa28d820d",
  measurementId: "G-WP68YF9VCL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Function to handle Google Login
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return user; // Return user details
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw error;
  }
};

export { auth, signInWithGoogle };