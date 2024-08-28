// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoO90aLn7iljtjF5rXJlsYYyR4gApkaAE",
  authDomain: "staywise-a5df1.firebaseapp.com",
  projectId: "staywise-a5df1",
  storageBucket: "staywise-a5df1.appspot.com",
  messagingSenderId: "298327323649",
  appId: "1:298327323649:web:f4c3491b738b2503a9fc00",
  measurementId: "G-KV1VGXXRXH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };
