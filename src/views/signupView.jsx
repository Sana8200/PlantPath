import "./loginSignupStyle.css";

export function SignupView(props) {
  function handleSubmit(event) {
    event.preventDefault();
    props.onSignup();
  }

  return (
    <div className="login-container">
      <h2>Create your Plant Account</h2>
      
      {props.error && (
        <div className="error-message">{props.error}</div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={props.email}
            onChange={(e) => props.onEmailChange(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Create a password (min 6 characters)"
            value={props.password}
            onChange={(e) => props.onPasswordChange(e.target.value)}
            minLength={6}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
            value={props.confirmPassword}
            onChange={(e) => props.onConfirmPasswordChange(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" disabled={props.loading}>
          {props.loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>
      
      <p className="signup-link">
        Already have an account?{" "}
        <span onClick={props.onSwitchToLogin} className="link">
          Login
        </span>
      </p>
    </div>
  );
}