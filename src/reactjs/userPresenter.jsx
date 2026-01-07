import { observer } from "mobx-react-lite";
import { UserView } from "../views/userView.jsx";
import { sendResetPassEmail } from "../services/AuthService.js";

export const User = observer(function UserPresenter({ model }) {
    const user = model.user;
    const isLoggedIn = !!user;

    const userEmail = user?.email || "";
    const userName = user?.displayName || userEmail.split('@')[0] || "User";

    function handleSelectLogin() {
        window.location.hash = "#/login";
    }

    function handleSelectSignup() {
        window.location.hash = "#/signup";
    }

    function handleSelectCollections() {
        window.location.hash = "#/collections";
    }

    async function handleResetPasswordACB() {
        if (userEmail) {
            const result = await sendResetPassEmail(userEmail);
            if (result.success) {
                alert(`Password reset email sent to ${userEmail}`);
            } else {
                alert(`Failed to send email: ${result.error}`);
            }
        } else {
            alert("No email found for this user.");
        }
    }

    return (
        <UserView
            isLoggedIn={isLoggedIn}
            userName={userName}
            userEmail={userEmail}
            onSelectLogin={handleSelectLogin}
            onSelectSignup={handleSelectSignup}
            onSelectCollections={handleSelectCollections}
            onResetPassword={handleResetPasswordACB}
        />
    );
});