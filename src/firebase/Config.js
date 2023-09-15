import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBWag-5ZKZaz3kEFdexTbPKn2ECCew_O2c",
    authDomain: "musik-plyerliste.firebaseapp.com",
    projectId: "musik-plyerliste",
    storageBucket: "musik-plyerliste.appspot.com",
    messagingSenderId: "26412014302",
    appId: "1:26412014302:web:b3998991b4ab08c038c04f"
  };

  // init Firebase
  firebase.initializeApp(firebaseConfig)

  //init firestore service
  const projectFirestore = firebase.firestore()
  const projectAuth = firebase.auth()
  const projectStorage = firebase.storage()


  //Timestamp
  const timestamp = firebase.firestore.FieldValue.serverTimestamp
  

  export { projectFirestore, projectAuth, projectStorage, timestamp  }