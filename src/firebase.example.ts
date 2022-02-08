import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// SET YOUR FIREBASE SETTINGS HERE
firebase.initializeApp({
  apiKey: "YOURS..",
  authDomain: "YOURS..",
  projectId: "YOURS..",
  storageBucket: "YOURS..",
  messagingSenderId: "YOURS..",
  appId: "YOURS.."
})

const auth = firebase.auth()
export { auth } 

const store = firebase.firestore()
export { store }

const storage = firebase.storage()
export { storage }

const fieldValue = firebase.firestore.FieldValue
export { fieldValue }

