import { initializeApp } from "firebase/app";
import { getAuth,
        //  signInWithRedirect, 
         signInWithPopup, 
         GoogleAuthProvider,
         createUserWithEmailAndPassword,
         signInWithEmailAndPassword,
         signOut,
         onAuthStateChanged
        } from "firebase/auth";

import { getFirestore, 
         doc, 
         getDoc, 
         setDoc } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAsdHhIhLtesaR7GujEgC9sqguQ6qGKWN0",
    authDomain: "online-store-2f430.firebaseapp.com",
    projectId: "online-store-2f430",
    storageBucket: "online-store-2f430.appspot.com",
    messagingSenderId: "93452544952",
    appId: "1:93452544952:web:ab5e636d4b9104df567d4d"
};
  
  // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt:"select_account",
})

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// export const signInWithGoogleRedirect = ()=> signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth, addInfos = {}) =>{
    if(!userAuth) return;

    const userDocRef = doc(db,"users", userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...addInfos,
            });
        } catch (error) {
            console.log("error in creating the user: ", error.message);
        }
    };
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password)=>{
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async(email,password)=> {
    if(!email || !password) return;
    return await signInWithEmailAndPassword( auth, email, password)
}

export const signOutUser = async()=> await signOut(auth);

export const onAuthStateChangeListener = (callback)=>onAuthStateChanged(auth,callback);