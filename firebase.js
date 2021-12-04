// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRT4SJLm3ZsXdshGOkJ102WcphWHe75wA",
  authDomain: "tinderapphelb.firebaseapp.com",
  projectId: "tinderapphelb",
  storageBucket: "tinderapphelb.appspot.com",
  messagingSenderId: "472157649847",
  appId: "1:472157649847:web:5f4ac5e1de8b26eb694632"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

export{ auth,db,storage };