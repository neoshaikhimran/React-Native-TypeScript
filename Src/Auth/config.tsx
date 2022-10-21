import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyCjdUV6TSypiK1QnS8DytOEyi7e1ZyfF0I",
    authDomain: "emailotp-c3b17.firebaseapp.com",
    databaseURL:"https://emailotp-c3b17.firebaseapp.com",
    projectId: "emailotp-c3b17",
    storageBucket: "emailotp-c3b17.appspot.com",
    messagingSenderId: "261421878526",
    appId: "1:261421878526:web:9d36b2f2d0abfc0d8429af",
    measurementId: "G-GD7R594DWW"
  };

  if(!firebase.apps.length){
        firebase.initializeApp(firebaseConfig);
        //firebase.firestore().settings({ experimentalForceLongPolling: true });
  }
  
  export {firebase};