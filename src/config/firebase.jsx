// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
