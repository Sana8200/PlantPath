import "/src/style/userPage.css";

export function UserPage(props) {
  const user = props.user;
  const firstLetter = user?.email ? user.email[0].toUpperCase() : "?";

  return (
    <div className="user-page">
      <div className="user-card">
        <div className="user-avatar">{firstLetter}</div>
        <h2 className="user-title">My Profile</h2>
        <p className="user-label">Email</p>
        <p className="user-email">{user?.email || "No email"}</p>
      </div>
    </div>
  );
}