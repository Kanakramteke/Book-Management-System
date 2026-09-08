import { useMemo } from "react";
import {
    User,
    Mail,
    ShieldCheck,
    Lock,
    Settings as SettingsIcon,
    Sun,
    Moon,
} from "lucide-react";

import "./Settings.css";

function Settings({ theme, setTheme }) {
    const user = useMemo(() => {
        try {
            const storedUser = localStorage.getItem("user");
            return storedUser ? JSON.parse(storedUser) : {};
        } catch {
            return {};
        }
    }, []);

    const userName = user?.name || "User";
    const userEmail = user?.email || "No email available";

    const avatarInitial =
        userName.trim().charAt(0).toUpperCase() || "U";

    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
    };

    return (
        <div className="settings-page">

            {/* Header */}
            <div className="settings-header">
                <div>
                    <h1>Settings</h1>
                    <p>
                        Manage your account information and preferences.
                    </p>
                </div>

                <div className="settings-header-icon">
                    <SettingsIcon size={24} />
                </div>
            </div>

            {/* Profile */}
            <section className="settings-card profile-overview-card">
                <div className="profile-overview">

                    <div className="settings-avatar">
                        {avatarInitial}
                    </div>

                    <div className="profile-overview-info">
                        <h2>{userName}</h2>
                        <p>{userEmail}</p>

                        <span className="account-status">
                            <span className="status-dot"></span>
                            Active account
                        </span>
                    </div>

                </div>
            </section>

            {/* Account */}
            <section className="settings-card">

                <div className="settings-card-header">
                    <div className="settings-section-icon">
                        <User size={20} />
                    </div>

                    <div>
                        <h2>Account Information</h2>
                        <p>Your registered account details.</p>
                    </div>
                </div>

                <div className="settings-fields">

                    <div className="settings-field">
                        <label>Full Name</label>

                        <div className="settings-input-wrapper">
                            <User size={18} />

                            <input
                                type="text"
                                value={userName}
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="settings-field">
                        <label>Email Address</label>

                        <div className="settings-input-wrapper">
                            <Mail size={18} />

                            <input
                                type="email"
                                value={userEmail}
                                readOnly
                            />
                        </div>
                    </div>

                </div>
            </section>

            {/* Appearance */}
            <section className="settings-card">

                <div className="settings-card-header">
                    <div className="settings-section-icon">
                        {theme === "dark" ? (
                            <Moon size={20} />
                        ) : (
                            <Sun size={20} />
                        )}
                    </div>

                    <div>
                        <h2>Appearance</h2>
                        <p>
                            Choose how BookShelf looks on your device.
                        </p>
                    </div>
                </div>

                <div className="theme-options">

                    <button
                        type="button"
                        className={`theme-option ${
                            theme === "light" ? "selected" : ""
                        }`}
                        onClick={() => handleThemeChange("light")}
                    >
                        <div className="theme-option-icon">
                            <Sun size={21} />
                        </div>

                        <div className="theme-option-content">
                            <strong>Light</strong>
                            <span>
                                Use the light appearance.
                            </span>
                        </div>

                        <div className="theme-radio">
                            {theme === "light" && (
                                <span></span>
                            )}
                        </div>
                    </button>

                    <button
                        type="button"
                        className={`theme-option ${
                            theme === "dark" ? "selected" : ""
                        }`}
                        onClick={() => handleThemeChange("dark")}
                    >
                        <div className="theme-option-icon">
                            <Moon size={21} />
                        </div>

                        <div className="theme-option-content">
                            <strong>Dark</strong>
                            <span>
                                Use the dark appearance.
                            </span>
                        </div>

                        <div className="theme-radio">
                            {theme === "dark" && (
                                <span></span>
                            )}
                        </div>
                    </button>

                </div>

            </section>

            {/* Security */}
            <section className="settings-card">

                <div className="settings-card-header">
                    <div className="settings-section-icon">
                        <ShieldCheck size={20} />
                    </div>

                    <div>
                        <h2>Security</h2>
                        <p>Your account security information.</p>
                    </div>
                </div>

                <div className="security-item">

                    <div className="security-item-icon">
                        <Lock size={20} />
                    </div>

                    <div className="security-item-content">
                        <h3>Password</h3>
                        <p>
                            Your password is securely protected and encrypted.
                        </p>
                    </div>

                    <span className="security-badge">
                        Protected
                    </span>

                </div>
            </section>

            {/* Note */}
            <div className="settings-note">
                <ShieldCheck size={18} />

                <p>
                    Your account information is associated with your
                    BookShelf account and is stored securely.
                </p>
            </div>

        </div>
    );
}

export default Settings;