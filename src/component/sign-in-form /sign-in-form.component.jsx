import { useState } from "react";
import { signInWithgooglepopup,createUserDocumentFromAuth,signInAuthUserWithEmailAndPassword} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.style.scss';
import Button from "../button/button.component";

const defaultFormField={
    email:'',
    password:'',
};
const SignInForm = () => {
    const [formField,setFormField]=useState(defaultFormField);
    const {email,password}=formField

    console.log(formField)
    const resetFormField = () =>{
        setFormField(defaultFormField);
    }
    const signInWithGoogle=async()=>{
        const {user}=await signInWithgooglepopup();
        await createUserDocumentFromAuth(user);
    };

    const handleSubmit = async(event)=>{
        event.preventDefault();

        try{
            const response = await signInAuthUserWithEmailAndPassword(
                email,password
            );
            console.log(response);
             resetFormField();


        }catch(error){
            switch(error.code){
                case 'auth/wrong-password':
                    alert('incorrect passeord');
                    break
                case 'auth/user-not-found':
                alert('no user associated with this email');
                break;
                default:
                    console.log(error)
            }
            
             }
    }

    const handleChange = (event) => {
       const {name,value} =event.target;
       setFormField({...formField,[name]:value})
           
    }
    

    return ( 
        <div className="sign-up-container">
            <h1>sign in page</h1>
            <h2>Already have an Account ?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>   
            <FormInput  label="Email" type='email' required onChange={handleChange} name="email" value={email}/>
            <FormInput  label="Password" type='password' required onChange={handleChange} name="password" value={password}/>
            <div className="buttons-container">
                <Button buttonType='inverted' type='submit'>SIGN IN</Button>  
                <Button type='button' buttonType='google' onClick={signInWithGoogle} >GOOGLE SIGN IN</Button>       
            </div> 
                  </form>
        </div>
     );
}
 
export default SignInForm;