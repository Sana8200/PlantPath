import { useState } from "react";
import { observer } from "mobx-react-lite";
import { SignupView } from "../views/signupView.jsx";


export const SignupPresenter = observer(
    function SignupPresenter(props){
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [confirmPassword, setConfirmPassword] = useState("");
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);

        function afterTimeout(){
            setLoading(false);
            alert("Signup UI Working - waiting for Firebase");
        }

        function handleSignup(){
            setError(null);

            if(password !== confirmPassword ){
                setError("Passwords don't match!");
                return;
            }

            if(password.length < 6){
                setError("Password must be at least 6 characters.")
                return;
            }

            setLoading(null);

            //fire base authentication
            console.log("Signup Attempt:", {email, password});

            setTimeout(afterTimeout, 1000);
            
        }

        function handleSwitchToLogin(){
            if(props.onSwitchToLogin){
                props.onSwitchToLogin();
            }
        }


        return(
            <SignupView email={email}
                        password={password}
                        confirmPassword={confirmPassword}
                        loading={loading}
                        error={error}
                        onEmailChange={setEmail}
                        onPasswordChange={setPassword}
                        onConfirmPasswordChange={setConfirmPassword}
                        onSignup={handleSignup}
                        onSwitchToLogin={handleSwitchToLogin}
            />
        );
    }
);


