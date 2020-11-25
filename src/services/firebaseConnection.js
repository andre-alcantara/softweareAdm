import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

let firebaseConfig = {
  apiKey: "AIzaSyAVXZP5Gth46ZKAvHzgYXqWuR3bJk1mo74",
  authDomain: "lovephysics-34f8e.firebaseapp.com",
  databaseURL: "https://lovephysics-34f8e.firebaseio.com",
  projectId: "lovephysics-34f8e",
  storageBucket: "lovephysics-34f8e.appspot.com",
  messagingSenderId: "861476843780",
  appId: "1:861476843780:web:c99b7e5e02ae33be5fe051",
};

if(!firebase.apps.length) {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}

export default firebase;