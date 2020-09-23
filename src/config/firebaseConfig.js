import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

export var firebaseConfig = {
  apiKey: "AIzaSyAXvJpxppxmWrar9bmhB8F53DGr2fd6RGM",
  authDomain: "angadi-6266d.firebaseapp.com",
  databaseURL: "https://angadi-6266d.firebaseio.com",
  projectId: "angadi-6266d",
  storageBucket: "angadi-6266d.appspot.com",
  messagingSenderId: "217752987550",
  appId: "1:217752987550:web:6279716bd78c6437edd88f",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
