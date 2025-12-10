import { useState } from "react";
import { observer } from "mobx-react-lite";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig.js";
import { SignupView } from "../views/signupView.jsx";

export const SignupPresenter = observer(function SignupPresenter(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSignup() {
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      window.location.hash = "#/search";
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Email already in use.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email address.");
      } else {
        setError("Signup failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  function handleSwitchToLogin() {
    window.location.hash = "#/login";
  }

  return (
    <SignupView
      email={email}
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
});