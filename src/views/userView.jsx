import "/src/style/userPage.css";
import { Button } from "/src/components/button.jsx";

export function UserView({ isLoggedIn, userName, userEmail, onSelectLogin, onSelectSignup, onSelectCollections, onDeleteAccount, onResetPassword }) {

  if (!isLoggedIn) {
    return (
      <div className="user-page">
        <div className="user-card">
          <div className="user-avatar">?</div>
          <h2 className="user-title">Not Logged In</h2>
          <p className="user-message">Log in to view your profile or create an account!</p>
          <div className="user-actions">
            <Button text="Go to Login" onClick={onSelectLogin} fullWidth={true} />
            <Button text="Create Account" onClick={onSelectSignup} color="light" outline={true} fullWidth={true} />
          </div>
        </div>
      </div>
    );
  }

  const firstLetter = userEmail ? userEmail[0].toUpperCase() : "U";

  return (
    <div className="user-page">
      <div className="user-card">
        <div className="user-avatar">{firstLetter}</div>
        <h2 className="user-title">{userName}</h2>

        <div className="user-info-section">
          <div className="user-info-item">
            <span className="user-label">Email</span>
            <span className="user-value">{userEmail}</span>
          </div>
        </div>

        <div className="user-actions">
          <Button text="My Collections" onClick={onSelectCollections} fullWidth={true} />
          <Button text="Reset Password" onClick={onResetPassword} color="red" outline={true} fullWidth={true} />
        </div>
      </div>
    </div>
  );
}