import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyBiEQwvKQDFld4XD7W3tIN-OECBJ7NSaVo",
  authDomain: "fruitsshop-bf9a7.firebaseapp.com",
  projectId: "fruitsshop-bf9a7",
  storageBucket: "fruitsshop-bf9a7.firebasestorage.app",
  messagingSenderId: "34758574044",
  appId: "1:34758574044:android:6827009a67d900bc371919",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export { auth  , db};
