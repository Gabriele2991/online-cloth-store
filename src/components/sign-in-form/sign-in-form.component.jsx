import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";

import { 
    signInWithGooglePopup, 
    signInAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth
} from "../../utils/firebase/firebase.utils";

import "./sign-in-form.styles.scss"

const defaultFormFields = {
    email:"",
    password:"",
}

const SignInForm = ()=>{

    const[formFields, setFormFields] = useState(defaultFormFields);
    const { email, password} = formFields;

    const resetFormFields = ()=>{
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async()=>{
        const {user} = await signInWithGooglePopup();
        createUserDocumentFromAuth(user);
    }

    const handleSubmit= async(event)=>{

        event.preventDefault();

        try{
            await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        }catch(error){
            switch (error.code) {
                case "auth/wrong-password":
                    alert("Incorrect password for email");
                    break;
                case "auth/user-not-found":
                    alert("no user associated with this email");
                    break;
                default:
                    console.log("Error code: ",error.code,"/n","Error log: ",error);
            }
        }
    };

    const handleChange = (event)=>{
        const {name, value} = event.target;//SENZA METTERCI IL TARGET NON PUOI SCRIVERE NEI CAMPI PORCO DIO
        setFormFields({...formFields,[name] :value})
    };
     
    return(
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput 
                    label= "Email"
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email} 
                />

                <FormInput 
                    label="Password"
                    type="password"
                    required
                    onChange={handleChange} 
                    name="password"
                    value={password}
                />
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button> 
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google Sign In</Button> 
                </div>
            </form>
        </div>
    )
};

export default SignInForm;