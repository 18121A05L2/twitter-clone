// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7kWxDt-3g4p2wNnMuLzRqXBD4m774Nto",
  authDomain: "twitter-clone-14fa1.firebaseapp.com",
  projectId: "twitter-clone-14fa1",
  storageBucket: "twitter-clone-14fa1.appspot.com",
  messagingSenderId: "794665737459",
  appId: "1:794665737459:web:d167e4f05fbbc0355d2b86",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// This is to making sure firebase doesnt initialize multiple instances


// our code 

const db = getFirestore()
const storage = getStorage()

export {app, db, storage}