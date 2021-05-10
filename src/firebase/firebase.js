import firebase from "firebase";
import "firebase/auth";

var app = firebase.initializeApp({
    apiKey: "AIzaSyD7gUy8ewhw2-oqf858Uqkyx5cVy51kna4",
    authDomain: "smartshop-f2b19.firebaseapp.com",
    projectId: "smartshop-f2b19",
    storageBucket: "smartshop-f2b19.appspot.com",
    messagingSenderId: "346080052804",
    appId: "1:346080052804:web:a622f86f587fb5bd95de11",
    measurementId: "G-0E3Z97RMJ1"
  });

export const auth = app.auth();
auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
export default app;
export const db = app.firestore();  
