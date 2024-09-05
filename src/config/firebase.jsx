// Import the functions you need from the SDKs you need
// import firebase from "firebase/app";
import 'firebase/firestore';
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: "staywise-53059.firebaseapp.com",
//   projectId: "staywise-53059",
//   storageBucket: "staywise-53059.appspot.com",
//   messagingSenderId: "312250822291",
//   appId: process.env.FIREBASE_APP_ID,
//   measurementId: "G-QLM7GXBFM1",
// };



// console.log(firebaseConfig)
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize services
export const auth = getAuth()
export const db = getFirestore(app);
export const storage = getStorage(app)

// Collection reference
const colRef = collection(db, 'accommodationList');

// Get collection data
// getDocs(colRef)
//   .then((snapshot) => {
//     const accommodationList = snapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     }));
//     console.log(accommodationList);
//   })
//   .catch((error) => {
//     console.error("Error fetching documents: ", error);
//   });


