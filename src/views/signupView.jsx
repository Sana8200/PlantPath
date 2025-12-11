import { useState } from "react";
import { Button } from "/src/style/button.jsx";
import "/src/style/authLayout.css";


function EyeIcon() {
  return (<svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>);
}
function EyeOffIcon() {
  return (<svg viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><path d="M14.12 12.12a3 3 0 1 1 4.24 4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>);
}

export function SignupView(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="split-screen-container">
      {/* LEFT SIDE */}
      <div className="auth-left">
        <div className="auth-overlay"></div>
        <div className="auth-left-content">
          <div className="auth-logo">🌿</div>
          <h1 className="auth-title">Join LeafKeeper</h1>
          <p className="auth-description">
            Start your journey today. Track your plants, get reminders, and watch your garden thrive.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - Signup Form */}
      <div className="auth-right">
        <div className="auth-form-container">
          <h2 className="login-signup-title">Create Account</h2>
          <p className="login-signup-subtitle">It only takes a minute</p>

          <form onSubmit={(e) => { e.preventDefault(); props.onSignup(); }}>
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
                  placeholder="At least 6 characters"
                  value={props.password}
                  onChange={(e) => props.onPasswordChange(e.target.value)}
                  minLength={6}
                  required
                />
                <button type="button" className="login-signup-password-toggle" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                </button>
              </div>
            </div>

            <div className="login-signup-form-group">
              <label className="login-signup-label">Confirm Password</label>
              <div className="login-signup-password-wrapper">
                <input
                  className="login-signup-input"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Repeat password"
                  value={props.confirmPassword}
                  onChange={(e) => props.onConfirmPasswordChange(e.target.value)}
                  required
                />
                <button type="button" className="login-signup-password-toggle" onClick={() => setShowConfirm(!showConfirm)}>
                  {showConfirm ? <EyeIcon /> : <EyeOffIcon />}
                </button>
              </div>
            </div>

            <div className="login-signup-submit">
              <Button text="Create Account" type="submit" loading={props.loading} size="large" fullWidth />
            </div>
          </form>

          <p className="login-signup-switch">
            Already have an account? <a onClick={props.onSwitchToLogin}>Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
}