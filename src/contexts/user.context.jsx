import { createContext,useEffect,useReducer } from "react";

import {
    createUserDocumentFromAuth,
    onAuthStateChangeListener,
    signOutUser
 } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
    setCurrentUser: ()=>null,
    currentUser: null,
})

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER :"SET_CURRENT_USER",
}

const userReducer = (state, action)=>{
    console.log(action);
    const {type, payload} = action;

    switch(type){
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return{
                ...state,
                currentUser:payload
            }
        default:
            throw new Error(`Unhandled type ${type} in userReducer in userContext`)
    }

}

const INITIAL_STATE = {
    currentUser:null
}

export const UserProvider = ({children})=>{
    const [{currentUser}/*<-destructured from state*/,dispatch] = useReducer(userReducer,INITIAL_STATE);
    console.log(currentUser);

    const setCurrentUser = (user) =>{
        dispatch({
            type:USER_ACTION_TYPES.SET_CURRENT_USER,
            payload:user
        });
    }

    const value = {currentUser , setCurrentUser};

    signOutUser();

    useEffect(()=>{
        const unsubscribe = onAuthStateChangeListener((user)=>{
            if(user){
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });
        
        return unsubscribe;
    },[])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};