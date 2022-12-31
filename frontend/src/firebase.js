import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC_pb3wRGFKu9mSpAdWZ7MdAvVXK6l3Itw",
  authDomain: "netflix-clone-aryan.firebaseapp.com",
  projectId: "netflix-clone-aryan",
  storageBucket: "netflix-clone-aryan.appspot.com",
  messagingSenderId: "203903592997",
  appId: "1:203903592997:web:b6eb4627f7ea90b6692dcc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db=getFirestore(app);
export {auth,db};



