import "./loginSignupStyle.css";

export function LoginView(props) {
  function handleSubmit(event) {
    event.preventDefault();
    props.onLogin();
  }

  return (
    <div className="login-container">
      <h2>Path to Plant World</h2>
      
      {props.error && (
        <div className="error-message">{props.error}</div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="your@email.com"
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
            placeholder="••••••••"
            value={props.password}
            onChange={(e) => props.onPasswordChange(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" disabled={props.loading}>
          {props.loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
      
      <p className="signup-link">
        New to PlantPath?{" "}
        <span onClick={props.onSwitchToSignup} className="link">
          Create an account
        </span>
      </p>
    </div>
  );
}