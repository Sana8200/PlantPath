import { observer } from "mobx-react-lite";
import { logout } from "/src/services/AuthService.js";
import { TopBar } from "../views/topBarView.jsx";

export const TopBarPresenter = observer(function TopBarPresenter(props) {

    function handleNavigateSearch() {
        window.location.hash = "#/search";
    }

    function handleNavigateCollections() {
        window.location.hash = "#/collections";
    }

    function handleNavigateUser() {
        window.location.hash = "#/user";
    }

    async function handleLogout() {
        const result = await logout();
        if (result.success) {
            window.location.hash = "#/";
        }
    }

    return (
        <TopBar
            onNavigateSearch={handleNavigateSearch}
            onNavigateCollections={handleNavigateCollections}
            onNavigateUser={handleNavigateUser}
            onLogout={handleLogout}
        />
    );
});