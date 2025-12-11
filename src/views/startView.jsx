import { Button } from "/src/style/button.jsx";
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

      {/* Right Side - Action Buttons */}
      <div className="auth-right">
        <div>
          <h2 className="get-start-tite">Get Started</h2>

          <div className="buttons-start">

            {/* Login Button */}
            <Button
              text="Log In"
              onClick={() => window.location.hash = "#/login"}
              size="large"
              color = "light"
              outline={true} 
              fullWidth
            />

            {/* Signup Button */}
            <Button
              text="Create Account"
              onClick={() => window.location.hash = "#/signup"}
              size="large" 
              color = "light"
              outline={true}  
              fullWidth
            />
            <div>
                <button 
                  className="withoutAccount"
                  onClick={() => window.location.hash = "#/search"}
                  >
                  Continue without an account
                </button>
            </div>
      
          </div>
        </div>
      </div>
    </div>
  );
}




















































































