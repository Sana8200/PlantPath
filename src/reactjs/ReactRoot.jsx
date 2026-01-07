import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { createHashRouter, RouterProvider, Outlet } from "react-router-dom";
import { onAuthChange } from "/src/services/AuthService.js";
import { TopBarPresenter } from "./topBarPresenter.jsx";
import { Start } from "./startPresenter.jsx";
import { Search } from "./searchPresenter.jsx";
import { LoginPresenter } from "./loginPresenter.jsx";
import { SignupPresenter } from "./signupPresenter.jsx";
import { Collections } from "./collectionsPresenter.jsx";
import { User } from "./userPresenter.jsx";
import { Details } from "./detailsPresenter.jsx";
import { SuspenseView } from "../views/suspenseView.jsx";

function AppLayout({ model }) {
    return (
        <>
            <TopBarPresenter model={model} />
            <Outlet />
        </>
    );
}

function makeRouter(model, metaDataModel) {
    return createHashRouter([
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
        {
            element: <AppLayout model={model} />,
            children: [
                {
                    path: "/search",
                    element: <Search model={model} metaDataModel={metaDataModel} />,
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

export const ReactRoot = observer(function ReactRoot({ plantPathModel, metaDataModel }) {
    const [loading, setLoading] = useState(true);
    const router = makeRouter(plantPathModel, metaDataModel);

    // listen for auth changes and update the model's user
    useEffect(() => {
        const unsubscribe = onAuthChange((firebaseUser) => {
            plantPathModel.setUser(firebaseUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <SuspenseView message="Loading..." />;
    }

    return (
        <>
            <Details model={plantPathModel} metaDataModel={metaDataModel} />
            <RouterProvider router={router} />
        </>
    );
});
