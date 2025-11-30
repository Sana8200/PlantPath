import "../style.css";

export function LoginView(props) {
  function handleSubmit(event) {
    event.preventDefault();
    props.onLogin();
  }

  return (
    <div className="login-container">
      <h2>Login to your Plant World</h2>
      
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
            placeholder="Enter your password"
            value={props.password}
            onChange={(e) => props.onPasswordChange(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" disabled={props.loading}>
          {props.loading ? "Logging in..." : "Login"}
        </button>
      </form>
      
      <p className="signup-link">
        Don't have an account?{" "}
        <span onClick={props.onSwitchToSignup} className="link">
          Sign up
        </span>
      </p>
    </div>
  );
}