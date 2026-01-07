import { Button } from "/src/components/button.jsx";
import "/src/style/topBarStyle.css";

export function TopBar(props) {
    return (
        <header className="topbar">
            <div className="topbar-header">
                <h1>🌿 LeafKeeper</h1>

                <nav className="topbar-nav">
                    <a className="nav-link" onClick={props.onNavigateSearch}>
                        🔍 Discover
                    </a>
                    <a className="nav-link" onClick={props.onNavigateCollections}>
                        🏡🌱 My Collections
                    </a>
                    <a className="nav-link" onClick={props.onNavigateUser}>
                        👤 Profile
                    </a>
                </nav>

                <Button
                    text="Logout"
                    onClick={props.onLogout}
                    color="dark"
                    size="small"
                />
            </div>
        </header>
    );
}