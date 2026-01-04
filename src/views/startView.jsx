import { Button } from "/src/components/button.jsx";
import "/src/style/authLayout.css";

export function StartView(props) {
  return (
    <div className="split-screen-container">
      <div className="auth-left">
        <div className="auth-overlay"></div>
        <div className="auth-left-content">
          <div className="auth-logo">🌿</div>
          <h1 className="auth-title">Welcome to LeafKeeper</h1>
          <p className="auth-description">
            Your digital gardening companion. Search for plants, create
            collections, and keep track of your plant care schedule effortlessly.
          </p>
        </div>
      </div>

      <div className="auth-right">
        <div>
          <h2 className="get-start-tite">Get Started</h2>

          <div className="buttons-start">
            <Button
              text="Log In"
              onClick={props.onLoginClick}
              size="large"
              color="light"
              outline={true}
              fullWidth
            />

            <Button
              text="Create Account"
              onClick={props.onSignupClick}
              size="large"
              color="light"
              outline={true}
              fullWidth
            />

            <button
              className="withoutAccount"
              onClick={props.onContinueWithoutAccount}
            >
              Continue without an account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}