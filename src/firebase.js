// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFunctions } from "firebase/functions";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDI7kOK16WKJUP6yC9zz9R5-7mbkf7RdpQ",
  authDomain: "cosmochat-ui-7b128.firebaseapp.com",
  databaseURL: "https://cosmochat-ui-7b128-default-rtdb.firebaseio.com",
  projectId: "cosmochat-ui-7b128",
  storageBucket: "cosmochat-ui-7b128.appspot.com",
  messagingSenderId: "384285579440",
  appId: "1:384285579440:web:e3ebcb6bd4ddc6260a4375",
  measurementId: "G-FZ430X053K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);
const auth = getAuth(app);
const db = getFirestore(app);

// function fetchCurrentUserId() {
//   return new Promise((resolve, reject)=>{
//     const unsubscribe = onAuthStateChanged(auth, (user)=>{
//       unsubscribe();

//   if (user) {
//     resolve(user.uid); // Return the UID of the current user
//     console.log("Current user:", user);
//   } else {
//     resolve(null); // Return null if no user is authenticated
//   }
//     }, reject)
//   });
// }

const provider = new GoogleAuthProvider();
const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("User signed in with Google:", result.user);
      console.log({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
      });
    })
    .catch((error) => {
      console.error("Error during sign-in with Google:", error);
    });
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in:", {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoUrl: user.photoURL,
    });
  } else {
    console.log("User is signed out");
  }
});

export { auth, functions, signInWithGoogle, db };

export default app;
