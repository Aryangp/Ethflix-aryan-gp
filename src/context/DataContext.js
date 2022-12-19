import { getDefaultAppConfig } from "@firebase/util";
import { addDoc, collection, doc, getDoc, query, setDoc, where } from "firebase/firestore";
import { createContext, useContext } from "react";
import { db } from "../firebase";
import { UserAuth } from "./AuthContext";
const DataContext=createContext();
export const DataContextProvider=({children})=>{
   const userDataRef=collection(db,'user');
     
   

   async function saveUser(uid1,name1,email1){
     let userDataDoc=doc(db,`users/${uid1}`)
    await setDoc(userDataDoc,{
        uid:uid1,
        name:name1,
        email:email1,
        status:false,
        currentPlan:null
       
    },{merge:true}).then((response)=>{
        console.log(response)
    })
   }

   async function getUserData(uid1){
    let userDataDoc=doc(db,`users/${uid1}`)
    const dataSnapshot=await getDoc(userDataDoc);
    // console.log(dataSnapshot.data());
    return dataSnapshot.data();
   }
    return(
        <DataContext.Provider value={{saveUser,getUserData}}>
            {children}
        </DataContext.Provider>
    )
}

export const UserData=()=>{
    return( useContext(DataContext))
}