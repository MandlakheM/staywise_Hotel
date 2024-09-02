// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "staywise-53059.firebaseapp.com",
  projectId: "staywise-53059",
  storageBucket: "staywise-53059.appspot.com",
  messagingSenderId: "312250822291",
  appId: process.env.FIREBASE_APP_ID,
  measurementId: "G-QLM7GXBFM1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
const firestore = getFirestore(app);

export { app, analytics, firestore };
