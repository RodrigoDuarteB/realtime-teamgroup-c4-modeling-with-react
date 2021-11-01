import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'


firebase.initializeApp({
  apiKey: "AIzaSyC5zms8KGn0uYlWfCMqfGUUiPsW_2EwmDg",
  authDomain: "c4meet-production.firebaseapp.com",
  projectId: "c4meet-production",
  storageBucket: "c4meet-production.appspot.com",
  messagingSenderId: "808557869672",
  appId: "1:808557869672:web:125d449e8df99a859699dd"
})


const auth = firebase.auth()
export { auth } 

const store = firebase.firestore()
export { store }

const storage = firebase.storage()
export { storage }

const fieldValue = firebase.firestore.FieldValue
export { fieldValue }

