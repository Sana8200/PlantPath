import { useState } from "react";
import { observer } from "mobx-react-lite";
import { LoginView } from "../views/loginView.jsx";

export const LoginPresenter = observer(function LoginPresenter(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleLogin() {
    setError(null);

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    // Firebase authentication 
    console.log("Login attempt:", { email, password });
    
    setTimeout(() => {
      setLoading(false);
      // Simulate login for testing UI flow
      // Remove this when Firebase is integrated
      alert("Login UI working! Firebase integration pending.");
    }, 1000);
  }

  function handleSwitchToSignup() {
    if (props.onSwitchToSignup) {
      props.onSwitchToSignup();
    }
  }

  return (
    <LoginView
      email={email}
      password={password}
      loading={loading}
      error={error}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onLogin={handleLogin}
      onSwitchToSignup={handleSwitchToSignup}
    />
  );
});