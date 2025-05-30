// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCnfKv9hzrJIf7j9RO8bYYPeh07tHpewSY",
  authDomain: "project-timeline-2510c.firebaseapp.com",
  databaseURL:
    "https://project-timeline-2510c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "project-timeline-2510c",
  storageBucket: "project-timeline-2510c.firebasestorage.appspot.com",
  messagingSenderId: "172851928804",
  appId: "1:172851928804:web:39b6be329509d2b33a56f1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const storage = getStorage(app);
export { db };
