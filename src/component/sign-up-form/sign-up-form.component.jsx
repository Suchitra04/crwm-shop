import { useState } from "react";
import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.style.scss';
import Button from "../button/button.component";
const defaultFormField={
    displayName:'',
    email:'',
    password:'',
    confirmPassword:'',
};
const SignUpForm = () => {
    const [formField,setFormField]=useState(defaultFormField);
    const {displayName,email,password,confirmPassword}=formField
    
    
   
    const resetFormField = () =>{
        setFormField(defaultFormField);
    }

    const handleSubmit = async(event)=>{
        event.preventDefault();

        if(password !== confirmPassword){
            alert("password do not match");
            return;
        }
        try{
            const {user} = await createAuthUserWithEmailAndPassword(email,password);
           

            await createUserDocumentFromAuth(user,{displayName});
             resetFormField();


        }catch(error){
            if(error.code === 'auth/email-already-in-use'){
                alert('cannot creat user,email already in use');
            }
            else
            console.log("user creation encountered an error",error);
        }
    }

    const handleChange = (event) => {
       const {name,value} =event.target;
       setFormField({...formField,[name]:value})
           
    }
    

    return ( 
        <div className="sign-up-container">
            <h2>Dont have an Account ?</h2>
            <h1>sign up with your email and password</h1>
            <form onSubmit={handleSubmit}>
               
                
                <FormInput label="display Name" type='text' required onChange={handleChange} name="displayName" value={displayName}/>
               
                <FormInput  label="Email" type='email' required onChange={handleChange} name="email" value={email}/>
                
                <FormInput  label="Password" type='password' required onChange={handleChange} name="password" value={password}/>

                <FormInput  label="Conform Password" type='password' required onChange={handleChange} name="confirmPassword"value={
                confirmPassword}/>
            
                <Button buttonType='inverted' type='submit'>SIGN UP</Button>         
            </form>
        </div>
     );
}
 
export default SignUpForm;