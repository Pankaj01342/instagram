import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB40-Bu0jYfXuHAWxoCNLWdbHlxEbWlO7Y",
  authDomain: "insta-clone-480b7.firebaseapp.com",
  projectId: "insta-clone-480b7",
  storageBucket: "insta-clone-480b7.appspot.com",
  messagingSenderId: "627098001296",
  appId: "1:627098001296:web:48b27c6558b72e53399d15",
  measurementId: "G-24P6RWYH7D"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();


export  {db,auth,storage};