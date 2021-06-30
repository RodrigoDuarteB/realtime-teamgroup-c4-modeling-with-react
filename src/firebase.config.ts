import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBG5eCutoTAgDPeBZY6FzljP0UOiQ3PKqQ",
    authDomain: "c4meet.firebaseapp.com",
    projectId: "c4meet",
    storageBucket: "c4meet.appspot.com",
    messagingSenderId: "798108306295",
    appId: "1:798108306295:web:57bc18402c4acc8f1bef72"
  };
  // Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

const auth = fb.auth()
export { auth } 

const store = fb.firestore()
export { store }

const storage = fb.storage()
export { storage }