// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsrW3h079c01wPQ74FeVU1BmDF075Ttvw",
  authDomain: "fir-practice-37050.firebaseapp.com",
  projectId: "fir-practice-37050",
  storageBucket: "fir-practice-37050.firebasestorage.app",
  messagingSenderId: "752185364146",
  appId: "1:752185364146:web:c5da0914d3609db8f643ab",
  measurementId: "G-PNWGBYB6MS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
const analytics = getAnalytics(app);