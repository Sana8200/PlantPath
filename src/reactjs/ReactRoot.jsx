import { TopBar } from "../views/topBarView.jsx";
import { Search } from "./searchPresenter.jsx";
import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig.js";
import { LoginPresenter } from "./loginPresenter.jsx";
import { SignupPresenter } from "./signupPresenter.jsx";
import { SuspenseView } from "../views/suspenseView.jsx";
import { createHashRouter, RouterProvider, Outlet } from "react-router-dom";
import { Collections } from "./collectionsPresenter.jsx";
import { Start } from "./startPresenter.jsx";
import { User } from "./userPresenter.jsx";
import { Details } from "./detailsPresenter.jsx";

// Layout with TopBar (for logged-in pages)
function AppLayout() {
  return (
    <>
      <TopBar />
      <Outlet />
    </>
  );
}

export function makeRouter(model) {
  return createHashRouter([
    // Public routes
    {
      path: "/",
      element: <Start model={model} />,
    },
    {
      path: "/signup",
      element: <SignupPresenter model={model} />,
    },
    {
      path: "/login",
      element: <LoginPresenter model={model} />,
    },
    // Protected routes 
    {
      element: <AppLayout />,
      children: [
        {
          path: "/search",
          element: <Search model={model} />,
        },
        {
          path: "/collections",
          element: <Collections model={model} />,
        },
        {
          path: "/user",
          element: <User model={model} />,
        },
      ],
    },
  ]);
}

export const ReactRoot = observer(function ReactRoot({ model }) {
  const [loading, setLoading] = useState(true);

  const router = makeRouter(model);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      model.user = firebaseUser;
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      {loading ? (
        <SuspenseView />
      ) : (
        <>
          <Details model={model} />
          <RouterProvider router={router} />
        </>
      )}
    </>
  );
});
