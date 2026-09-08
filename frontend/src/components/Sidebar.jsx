import { NavLink, useLocation, useNavigate } from "react-router-dom";

function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();

    const isAddBookActive =
        location.pathname === "/books" &&
        location.state?.openAddBook === true;

    const isBooksActive =
        location.pathname === "/books" &&
        !isAddBookActive;

    let user = {};

    try {
        const storedUser = localStorage.getItem("user");
        user = storedUser ? JSON.parse(storedUser) : {};
    } catch {
        user = {};
    }

    const userName = user?.name || "User";
    const userEmail = user?.email || "No email available";

    const avatarInitial =
        userName.trim().charAt(0).toUpperCase() || "U";

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login", { replace: true });
    };

    return (
        <aside className="sidebar">

            <div className="sidebar-logo">
                <div className="logo-icon">📚</div>
                <span>BookShelf</span>
            </div>

            <nav className="sidebar-nav">

                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        `nav-item ${isActive ? "active" : ""}`
                    }
                >
                    <span>◉</span>
                    <span>Dashboard</span>
                </NavLink>

                <NavLink
                    to="/books"
                    className={() =>
                        `nav-item ${isBooksActive ? "active" : ""}`
                    }
                >
                    <span>📚</span>
                    <span>Books</span>
                </NavLink>

                <NavLink
                    to="/books"
                    state={{ openAddBook: true }}
                    className={() =>
                        `nav-item ${isAddBookActive ? "active" : ""}`
                    }
                >
                    <span>＋</span>
                    <span>Add Book</span>
                </NavLink>

            </nav>

            <div className="sidebar-bottom">

                <NavLink
                    to="/settings"
                    className={({ isActive }) =>
                        `nav-item ${isActive ? "active" : ""}`
                    }
                >
                    <span>⚙</span>
                    <span>Settings</span>
                </NavLink>

                <div className="sidebar-divider"></div>

                <div className="sidebar-profile">
                    <div className="profile-avatar">
                        {avatarInitial}
                    </div>

                    <div className="profile-info">
                        <strong>{userName}</strong>
                        <span>{userEmail}</span>
                    </div>
                </div>

                <button
                    className="logout-button"
                    type="button"
                    onClick={handleLogout}
                >
                    <span>↪</span>
                    <span>Logout</span>
                </button>

            </div>
        </aside>
    );
}

export default Sidebar;