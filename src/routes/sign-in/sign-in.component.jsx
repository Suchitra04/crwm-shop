

import SignUpForm from "../../component/sign-up-form/sign-up-form.component";
import { signInWithgooglepopup , createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
   
    const logGoogleUser=async()=>{
        const {user}=await signInWithgooglepopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    };
    
    return ( 
        <div>
            <h1>sign in page</h1>
            <button onClick={logGoogleUser}>sign in with google popup</button>
        <SignUpForm />
        </div>
     );
}
 
export default SignIn;