import * as firebase from 'firebase/app'
import "firebase/auth"
import 'firebase/storage'
require("firebase/firestore")
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBYAFKAcyhFjlHywpz04s6W2SVWEJAwXx4",
    authDomain: "gamestation-b7eba.firebaseapp.com",
    databaseURL: "https://gamestation-b7eba.firebaseio.com",
    projectId: "gamestation-b7eba",
    storageBucket: "gamestation-b7eba.appspot.com",
    messagingSenderId: "870076970097",
    appId: "1:870076970097:web:959eb7292ea795b92ed7d0"
  };
  // Initialize Firebase
 const fb = firebase.initializeApp(firebaseConfig);

 const db = firebase.firestore()

 export  {fb, db}

  