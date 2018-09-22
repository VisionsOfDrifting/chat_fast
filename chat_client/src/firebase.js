import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyBI19Uy-NYnVhFcYkSDtUV3aA2qmExiiLs",
  authDomain: "chatfast-e87aa.firebaseapp.com",
  databaseURL: "https://chatfast-e87aa.firebaseio.com",
  projectId: "chatfast-e87aa",
  storageBucket: "chatfast-e87aa.appspot.com",
  messagingSenderId: "547906416702"
};
firebase.initializeApp(config);

export default firebase;
