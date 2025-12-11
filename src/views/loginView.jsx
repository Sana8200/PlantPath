import { useState } from "react";
import { Button } from "/src/style/button.jsx";
import "/src/style/authLayout.css"; 


function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <path d="M14.12 12.12a3 3 0 1 1 4.24 4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

export function LoginView(props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="split-screen-container">
      {/* LEFT SIDE (Same as StartView) */}
      <div className="auth-left">
        <div className="auth-overlay"></div>
        <div className="auth-left-content">
          <div className="auth-logo">🌿</div>
          <h1 className="auth-title">Welcome Back!</h1>
          <p className="auth-description">
            Ready to tend to your garden? Sign in to access your collections and care schedules.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - Login Form */}
      <div className="auth-right">
        <div className="auth-form-container">
          <h2 className="login-signup-title">Sign In</h2>
          <p className="login-signup-subtitle">Enter your details to continue</p>

          <form onSubmit={(e) => { e.preventDefault(); props.onLogin(); }}>
            {props.error && <div className="login-signup-error">{props.error}</div>}

            <div className="login-signup-form-group">
              <label className="login-signup-label">Email</label>
              <input
                className="login-signup-input"
                type="email"
                placeholder="your@email.com"
                value={props.email}
                onChange={(e) => props.onEmailChange(e.target.value)}
                required
              />
            </div>

            <div className="login-signup-form-group">
              <label className="login-signup-label">Password</label>
              <div className="login-signup-password-wrapper">
                <input
                  className="login-signup-input"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={props.password}
                  onChange={(e) => props.onPasswordChange(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="login-signup-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                </button>
              </div>
            </div>

            <div className="login-signup-submit">
              <Button text="Sign In" type="submit" loading={props.loading} size="large" fullWidth />
            </div>
          </form>

          <p className="login-signup-switch">
            New to LeafKeeper? <a onClick={props.onSwitchToSignup}>Create an account</a>
          </p>
        </div>
      </div>
    </div>
  );
}