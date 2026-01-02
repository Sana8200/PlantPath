import { observer } from "mobx-react-lite";
import { StartView } from "../views/startView.jsx";

export const Start = observer(function StartPresenter({ model }) {
    function handleLoginClick() {
        window.location.hash = "#/login";
    }

    function handleSignupClick() {
        window.location.hash = "#/signup";
    }

    function handleContinueWithoutAccount() {
        window.location.hash = "#/search";
    }

    return (
        <StartView
            onLoginClick={handleLoginClick}
            onSignupClick={handleSignupClick}
            onContinueWithoutAccount={handleContinueWithoutAccount}
        />
    );
});