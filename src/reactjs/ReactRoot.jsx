import { Search } from "./searchPresenter.jsx";
import { observer } from "mobx-react-lite";
import { LoginPresenter } from "./loginPresenter.jsx";
import { SignupPresenter } from "./signupPresenter.jsx";
import "../style.css";
import { useState } from "react";


export const ReactRoot = observer(
  function ReactRoot() {

    const [currentView, setCurrentView] = useState("login");

    if(currentView == "signup"){
      return(
        <SignupPresenter onSwitchToLogin={() => setCurrentView("login")} />
      );
    }
    return (
            <div>
              <LoginPresenter onSwitchToSignup={() => setCurrentView("signup")} />
              <Search />
            </div>
    );
  }
);
