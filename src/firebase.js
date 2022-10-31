import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword ,onAuthStateChanged, signOut} from "firebase/auth";

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

// async function createAccountByEmail(email,password){
//   try{
//       const userCrendentials=await createUserWithEmailAndPassword(auth,email,password);
//       console.log(( userCrendentials).user)
//   }catch(error){
//     console.log(error);
//   }
  
// }
// async function signInWithEmail(email,password){
//   try{
//       const userCrendentials=await signInWithEmailAndPassword(auth,email,password);
//       console.log(( userCrendentials).user)
//   }catch(error){
//     console.log(error);
//   }
  
// }
// async function logOut(){
//   try{
//     await signOut(auth);
//   }catch(err){
//     console.log(err);
//   }
  
// }

export {auth};



