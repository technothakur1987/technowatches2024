// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCoqgQJBWiOZ01cBV_YnaVbczYG820eIZ0",
  authDomain: "technowatches-46772.firebaseapp.com",
  projectId: "technowatches-46772",
  storageBucket: "technowatches-46772.appspot.com",
  messagingSenderId: "954451473615",
  appId: "1:954451473615:web:583f37fb7abf29e67c73ba"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth }