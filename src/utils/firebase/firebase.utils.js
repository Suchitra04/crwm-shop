import {initializeApp}from 'firebase/app';
import {getAuth,signInWithRedirect,signInWithPopup,GoogleAuthProvider,createUserWithEmailAndPassword} from 'firebase/auth'
import { getFirestore,doc,getDoc,setDoc} from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyDJjlnEpbeAFYlKNYnh6WuYHhFm4I_RLWI",
    authDomain: "crwn-clothing-db-6bb9a.firebaseapp.com",
    projectId: "crwn-clothing-db-6bb9a",
    storageBucket: "crwn-clothing-db-6bb9a.appspot.com",
    messagingSenderId: "855602377716",
    appId: "1:855602377716:web:2c2470f10ff5dd645cffa1"
  };
  
  // Initialize Firebase
 const firebaseApp = initializeApp(firebaseConfig);
  
  const  googleprovider=new GoogleAuthProvider();
  
  googleprovider.setCustomParameters({
    prompt:"select_account"
  });
 
  export const auth=getAuth();
  export const signInWithgooglepopup=()=>signInWithPopup(auth, googleprovider);
  export const signInWithgoogleRedirect=()=>signInWithRedirect(auth, googleprovider);

  export const db= getFirestore();

  export const  createUserDocumentFromAuth = async(userAuth,additionalInformation ={}) =>{
    if (!userAuth) return;
    const userDocRef=doc(db,'users',userAuth.uid);

   
    const userSnapshot=await getDoc(userDocRef);

    

    if(!userSnapshot.exists()){
        const {displayName,email}=userAuth;
        const createAt=new Date();
        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                createAt,
                ...additionalInformation
            });
        
        }catch(error){
            console.log(error.message)
        }
    }
    return userDocRef;
  }

  export const createAuthUserWithEmailAndPassword=async(email,password)=>{
   if(!email || !password) return;
   return await createUserWithEmailAndPassword(auth,email,password);
  }