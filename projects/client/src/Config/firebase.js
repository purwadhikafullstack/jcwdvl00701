// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB7bIecdKYKMV6W0uGF7YcgR2HR5ACjuwA",
    authDomain: "turu-project.firebaseapp.com",
    projectId: "turu-project",
    storageBucket: "turu-project.appspot.com",
    messagingSenderId: "34448722967",
    appId: "1:34448722967:web:3b085a29adf323733ee052"
};

// Initialize Firebase
const init = firebase.initializeApp(firebaseConfig)
export const authFirebase = init.auth()