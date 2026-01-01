import { useState } from "react";
import { observer } from "mobx-react-lite";
import { loginWithEmail, sendResetPassEmail } from "/src/services/AuthService.js";
import { LoginView } from "../views/loginView.jsx";

export const LoginPresenter = observer(function LoginPresenter({ model }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleLogin() {
        setError(null);

        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        setLoading(true);
        const result = await loginWithEmail(email, password);
        setLoading(false);

        if (result.success) {
            window.location.hash = "#/search";
        } else {
            setError(result.error);
        }
    }

    function handleSwitchToSignup() {
        window.location.hash = "#/signup";
    }

    async function handleResetPasswordACB() {
        if (!email) {
            alert("Please enter your email address in the field above to reset your password.");
            return;
        }
        const result = await sendResetPassEmail(email);
        if (result.success) {
            alert(`Password reset email sent to ${email}`);
        } else {
            alert(`Failed to send email: ${result.error}`);
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
            onResetPassword={handleResetPasswordACB}
        />
    );
});