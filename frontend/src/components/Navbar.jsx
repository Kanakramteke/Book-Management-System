function Navbar() {
    return (
        <header className="top-navbar">

            <div>
                <span className="navbar-label">
                    Library
                </span>
            </div>

            <div className="navbar-right">

                <button className="icon-button">
                    🔔
                </button>

                <div className="navbar-profile">

                    <div className="navbar-avatar">
                        K
                    </div>

                    <div className="navbar-user">
                        <strong>Kanak</strong>
                        <span>Administrator</span>
                    </div>

                </div>

            </div>

        </header>
    );
}

export default Navbar;