import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// Your web app's Firebase configuration
/* const firebaseConfig = {
    apiKey: "AIzaSyBG5eCutoTAgDPeBZY6FzljP0UOiQ3PKqQ",
    authDomain: "c4meet.firebaseapp.com",
    projectId: "c4meet",
    storageBucket: "c4meet.appspot.com",
    messagingSenderId: "798108306295",
    appId: "1:798108306295:web:57bc18402c4acc8f1bef72"
  }; */

firebase.initializeApp({
  apiKey: "AIzaSyC5zms8KGn0uYlWfCMqfGUUiPsW_2EwmDg",
  authDomain: "c4meet-production.firebaseapp.com",
  projectId: "c4meet-production",
  storageBucket: "c4meet-production.appspot.com",
  messagingSenderId: "808557869672",
  appId: "1:808557869672:web:125d449e8df99a859699dd"
})
  // Initialize Firebase
//const fb = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
export { auth } 

const store = firebase.firestore()
export { store }

const storage = firebase.storage()
export { storage }
