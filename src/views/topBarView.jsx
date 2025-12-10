import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig.js";
import { Button } from "/src/components/button.jsx";
import "/src/style/topBarStyle.css";

export function TopBar(props) {

  function handleBackToSearchACB() {
    window.location.hash = "#/search";
  }

  function handleBackToUserACB() {
    window.location.hash = "#/user";
  }

  function handleBackToCollectionsACB() {
    window.location.hash = "#/collections";
  }

  async function handleLogout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
    window.location.hash = "#/login";   // Back to login or Welcom ?
  }

  return (
    <div className="topbar">
      <header className="topbar-header">
        <h1>🌿 LeafKeeper</h1>
        <Button text="Logout" onClick={handleLogout} color="red" size="medium" />
      </header>

      <nav className="topbar-nav">
        <Button text="🔍 Discover" onClick={handleBackToSearchACB} size="medium" />
        <Button text="📚 My Collections" onClick={handleBackToCollectionsACB} size="medium" />
        <Button text="👤 User" onClick={handleBackToUserACB} size="medium" />
      </nav>
    </div>
  );
}