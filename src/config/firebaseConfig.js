import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

export var firebaseConfig = {
  apiKey: "AIzaSyAXvJpxppxmWraxxxxxxxxxx",
  authDomain: "yourconfigs.firebaseapp.com",
  databaseURL: "https://yourconfigs.firebaseio.com",
  projectId: "yourconfigs",
  storageBucket: "yourconfigs.appspot.com",
  messagingSenderId: "217752987550",
  appId: "1:111111111111:web:111111111111111111",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
