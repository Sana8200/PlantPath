import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig.js";
import { Button } from "/src/components/button.jsx";
import "/src/style/topBarStyle.css";

export function TopBar(props) {

  function goToSearch() {
    window.location.hash = "#/search";
  }

  function goToCollections() {
    window.location.hash = "#/collections";
  }

  function goToUser() {
    window.location.hash = "#/user";
  }

  async function handleLogout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
    window.location.hash = "#/";   // go back to welcome or login ?
  }

  return (
    <div className="topbar">
      <header className="topbar-header">
        <h1>🌿 LeafKeeper</h1>
        <Button text="Logout" onClick={handleLogout} color="red" size="medium"  />
      </header>

      <nav className="topbar-nav">
        <Button text="🔍 Discover" onClick={goToSearch} size="medium" />
        <Button text="📚 My Collections" onClick={goToCollections} size="medium" />
        <Button text="👤 Profile" onClick={goToUser} size="medium" />
      </nav>
    </div>
  );
}