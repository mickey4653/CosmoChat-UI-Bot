// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFunctions } from "firebase/functions";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDI7kOK16WKJUP6yC9zz9R5-7mbkf7RdpQ",
  authDomain: "cosmochat-ui-7b128.firebaseapp.com",
  projectId: "cosmochat-ui-7b128",
  storageBucket: "cosmochat-ui-7b128.appspot.com",
  messagingSenderId: "384285579440",
  appId: "1:384285579440:web:e3ebcb6bd4ddc6260a4375",
  measurementId: "G-FZ430X053K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);

export {functions};
export default app;