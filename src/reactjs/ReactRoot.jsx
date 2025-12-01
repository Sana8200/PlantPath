import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig.js";
import { LoginPresenter } from "./loginPresenter.jsx";
import { SignupPresenter } from "./signupPresenter.jsx";
import { Search } from "./searchPresenter.jsx";
import { SuspenseView } from "../views/suspenseView.jsx";
import "../views/loginSignupStyle.css";

export const ReactRoot = observer(function ReactRoot() {
  const [currentView, setCurrentView] = useState("login");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  async function handleLogout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="loading-container">
        <SuspenseView />
      </div>
    );
  }

  // Not logged in - show login or signup
  if (!user) {
    if (currentView === "signup") {
      return <SignupPresenter onSwitchToLogin={() => setCurrentView("login")} />;
    }
    return <LoginPresenter onSwitchToSignup={() => setCurrentView("signup")} />;
  }

  // Logged in - show main app
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🌱 TempoTrain</h1>
        <div className="user-info">
          <span>{user.email}</span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>
      <main className="app-main">
        <Search />
      </main>
    </div>
  );
});