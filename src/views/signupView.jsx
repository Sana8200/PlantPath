import { useState } from "react";
import { Button } from "/src/components/button.jsx";
import "/src/style/authLayout.css";

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

export function SignupView({ email, password, confirmPassword, loading, error, onEmailChange, onPasswordChange, onConfirmPasswordChange, onSignup, onSwitchToLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    onSignup();
  }

  return (
    <div className="split-screen-container">
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

      <div className="auth-right">
        <div className="auth-form-container">
          <h2 className="login-signup-title">Create Account</h2>
          <p className="login-signup-subtitle">It only takes a minute</p>

          <form onSubmit={handleSubmit}>
            {error && <div className="login-signup-error">{error}</div>}

            <div className="login-signup-form-group">
              <label className="login-signup-label">Email</label>
              <input
                className="login-signup-input"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
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
                  value={password}
                  onChange={(e) => onPasswordChange(e.target.value)}
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
                  value={confirmPassword}
                  onChange={(e) => onConfirmPasswordChange(e.target.value)}
                  required
                />
                <button type="button" className="login-signup-password-toggle" onClick={() => setShowConfirm(!showConfirm)}>
                  {showConfirm ? <EyeIcon /> : <EyeOffIcon />}
                </button>
              </div>
            </div>

            <div className="login-signup-submit">
              <Button text="Create Account" type="submit" loading={loading} size="large" fullWidth={true} />
            </div>
          </form>

          <p className="login-signup-switch">
            Already have an account? <a onClick={onSwitchToLogin}>Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
}