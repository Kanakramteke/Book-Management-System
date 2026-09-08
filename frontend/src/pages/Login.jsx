import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, BookOpen } from "lucide-react";
import axios from "axios";

import "./Login.css";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));

        setServerError("");
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Enter a valid email address";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);
            setServerError("");

            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email: formData.email,
                    password: formData.password,
                }
            );

            // Save JWT token
            localStorage.setItem(
                "token",
                response.data.token
            );

            // Save user information
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            // Go to dashboard
            navigate("/dashboard");

        } catch (error) {
            console.error("Login error:", error);

            if (error.response?.data?.message) {
                setServerError(
                    error.response.data.message
                );
            } else {
                setServerError(
                    "Unable to login. Please try again."
                );
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">

            <div className="login-container">

                {/* Left Side */}
                <div className="login-brand-section">

                    <div className="login-brand">

                        <div className="login-brand-icon">
                            <BookOpen size={25} />
                        </div>

                        <span>BookShelf</span>

                    </div>

                    <div className="login-brand-content">

                        <h1>
                            Manage your
                            <br />
                            library smarter.
                        </h1>

                        <p>
                            Organize, manage and keep track of your
                            books in one simple place.
                        </p>

                    </div>

                    <div className="login-brand-footer">

                        <span>📚</span>

                        <p>
                            Your personal digital library
                        </p>

                    </div>

                </div>

                {/* Right Side */}
                <div className="login-form-section">

                    <div className="login-form-container">

                        <div className="login-heading">

                            <h2>
                                Welcome back
                            </h2>

                            <p>
                                Sign in to continue to your library
                            </p>

                        </div>

                        {serverError && (
                            <div className="login-server-error">
                                {serverError}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>

                            {/* Email */}
                            <div className="form-group">

                                <label htmlFor="email">
                                    Email address
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={
                                        errors.email
                                            ? "input-error"
                                            : ""
                                    }
                                />

                                {errors.email && (
                                    <span className="error-message">
                                        {errors.email}
                                    </span>
                                )}

                            </div>

                            {/* Password */}
                            <div className="form-group">

                                <div className="password-label-row">

                                    <label htmlFor="password">
                                        Password
                                    </label>

                                    <button
                                        type="button"
                                        className="forgot-password"
                                        onClick={() =>
                                            alert(
                                                "Password reset will be added later."
                                            )
                                        }
                                    >
                                        Forgot password?
                                    </button>

                                </div>

                                <div
                                    className={`password-input-wrapper ${
                                        errors.password
                                            ? "input-error"
                                            : ""
                                    }`}
                                >

                                    <input
                                        id="password"
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name="password"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />

                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() =>
                                            setShowPassword(
                                                (prev) => !prev
                                            )
                                        }
                                    >
                                        {showPassword ? (
                                            <EyeOff size={19} />
                                        ) : (
                                            <Eye size={19} />
                                        )}
                                    </button>

                                </div>

                                {errors.password && (
                                    <span className="error-message">
                                        {errors.password}
                                    </span>
                                )}

                            </div>

                            {/* Remember Me */}
                            <div className="login-options">

                                <label className="remember-me">

                                    <input
                                        type="checkbox"
                                    />

                                    <span>
                                        Remember me
                                    </span>

                                </label>

                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="login-button"
                                disabled={loading}
                            >
                                {loading
                                    ? "Signing in..."
                                    : "Sign in"}
                            </button>

                        </form>

                        {/* Register */}
                        <div className="register-prompt">

                            <span>
                                Don't have an account?
                            </span>

                            <Link to="/register">
                                Create account
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;