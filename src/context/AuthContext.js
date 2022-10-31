import {createContext, useContext, useEffect, useState } from "react"
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,onAuthStateChanged, signOut} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext=createContext();
export const AuthContextProvider=({children})=>{
    const [user,setUser]=useState();
    async function createAccountByEmail(email,password){
        try{
            const userCrendentials=await createUserWithEmailAndPassword(auth,email,password);
            console.log(( userCrendentials).user)
        }catch(error){
          console.log(error);
        }
        
      }
      async function signInWithEmail(email,password){
        try{
            const userCrendentials=await signInWithEmailAndPassword(auth,email,password);
            console.log(( userCrendentials).user)
        }catch(error){
          console.log(error);
        }
        
      }
      async function logOut(){
        try{
          await signOut(auth);
        }catch(err){
          console.log(err);
        }
    }  
    const provider=new GoogleAuthProvider();
    async function googleSign(){
      try{
       const userGoogle=await signInWithPopup(auth,provider);
      }catch(err){
        console.log(err)
      }
    }
    useEffect(()=>{
        onAuthStateChanged(auth,(user1)=>{
           setUser(user1);
           console.log(user1)
        })
      },[])
    return(
        <AuthContext.Provider value={{createAccountByEmail,logOut,signInWithEmail,googleSign,auth,user}}>
            {children}
        </AuthContext.Provider>
    )
}


export const UserAuth=()=>{
    return( useContext(AuthContext))
}