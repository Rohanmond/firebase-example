// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCR3vn_xFhmsqnTFBRMyR4V2bVLqhPBYiY",
  authDomain: "fir-demo-92f64.firebaseapp.com",
  projectId: "fir-demo-92f64",
  storageBucket: "fir-demo-92f64.appspot.com",
  messagingSenderId: "873199460580",
  appId: "1:873199460580:web:b055be75eb1cf2765c4cf1",
  measurementId: "G-86CKMX6H0C"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
