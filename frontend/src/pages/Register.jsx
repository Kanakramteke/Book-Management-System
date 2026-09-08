import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, BookOpen, Check } from "lucide-react";
import axios from "axios";

import "./Register.css";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

        if (!formData.name.trim()) {
            newErrors.name = "Full name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Enter a valid email address";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password =
                "Password must be at least 6 characters";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword =
                "Please confirm your password";
        } else if (
            formData.password !== formData.confirmPassword
        ) {
            newErrors.confirmPassword =
                "Passwords do not match";
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
                "http://localhost:5000/api/auth/register",
                {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                }
            );

            // Store token received from backend
            localStorage.setItem(
                "token",
                response.data.token
            );

            // Store user information
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            // Go directly to dashboard
            navigate("/dashboard");

        } catch (error) {
            console.error(
                "Registration error:",
                error
            );

            if (error.response?.data?.message) {
                setServerError(
                    error.response.data.message
                );
            } else {
                setServerError(
                    "Unable to create account. Please try again."
                );
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-page">

            <div className="register-container">

                {/* Left Brand Section */}
                <div className="register-brand-section">

                    <div className="register-brand">

                        <div className="register-brand-icon">
                            <BookOpen size={25} />
                        </div>

                        <span>BookShelf</span>

                    </div>

                    <div className="register-brand-content">

                        <h1>
                            Your books.
                            <br />
                            Your library.
                        </h1>

                        <p>
                            Create your account and start building
                            your personal digital library today.
                        </p>

                        <div className="register-features">

                            <div className="register-feature">

                                <div className="feature-icon">
                                    <Check size={16} />
                                </div>

                                <span>
                                    Organize your books easily
                                </span>

                            </div>

                            <div className="register-feature">

                                <div className="feature-icon">
                                    <Check size={16} />
                                </div>

                                <span>
                                    Track your entire collection
                                </span>

                            </div>

                            <div className="register-feature">

                                <div className="feature-icon">
                                    <Check size={16} />
                                </div>

                                <span>
                                    Manage everything in one place
                                </span>

                            </div>

                        </div>

                    </div>

                    <div className="register-brand-footer">

                        <span>📚</span>

                        <p>
                            Start your reading journey
                        </p>

                    </div>

                </div>

                {/* Right Form Section */}
                <div className="register-form-section">

                    <div className="register-form-container">

                        <div className="register-heading">

                            <h2>
                                Create an account
                            </h2>

                            <p>
                                Get started with your personal library
                            </p>

                        </div>

                        {serverError && (
                            <div className="register-server-error">
                                {serverError}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>

                            {/* Name */}
                            <div className="register-form-group">

                                <label htmlFor="name">
                                    Full name
                                </label>

                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={
                                        errors.name
                                            ? "register-input-error"
                                            : ""
                                    }
                                />

                                {errors.name && (
                                    <span className="register-error">
                                        {errors.name}
                                    </span>
                                )}

                            </div>

                            {/* Email */}
                            <div className="register-form-group">

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
                                            ? "register-input-error"
                                            : ""
                                    }
                                />

                                {errors.email && (
                                    <span className="register-error">
                                        {errors.email}
                                    </span>
                                )}

                            </div>

                            {/* Password */}
                            <div className="register-form-group">

                                <label htmlFor="password">
                                    Password
                                </label>

                                <div
                                    className={`register-password-wrapper ${
                                        errors.password
                                            ? "register-input-error"
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
                                        placeholder="Create a password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />

                                    <button
                                        type="button"
                                        className="register-password-toggle"
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
                                    <span className="register-error">
                                        {errors.password}
                                    </span>
                                )}

                            </div>

                            {/* Confirm Password */}
                            <div className="register-form-group">

                                <label htmlFor="confirmPassword">
                                    Confirm password
                                </label>

                                <div
                                    className={`register-password-wrapper ${
                                        errors.confirmPassword
                                            ? "register-input-error"
                                            : ""
                                    }`}
                                >

                                    <input
                                        id="confirmPassword"
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name="confirmPassword"
                                        placeholder="Confirm your password"
                                        value={
                                            formData.confirmPassword
                                        }
                                        onChange={handleChange}
                                    />

                                    <button
                                        type="button"
                                        className="register-password-toggle"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                (prev) => !prev
                                            )
                                        }
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff size={19} />
                                        ) : (
                                            <Eye size={19} />
                                        )}
                                    </button>

                                </div>

                                {errors.confirmPassword && (
                                    <span className="register-error">
                                        {errors.confirmPassword}
                                    </span>
                                )}

                            </div>

                            {/* Terms */}
                            <div className="register-terms">

                                <input
                                    id="terms"
                                    type="checkbox"
                                />

                                <label htmlFor="terms">
                                    I agree to the{" "}
                                    <span>
                                        Terms & Conditions
                                    </span>
                                </label>

                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="register-button"
                                disabled={loading}
                            >
                                {loading
                                    ? "Creating account..."
                                    : "Create account"}
                            </button>

                        </form>

                        {/* Login */}
                        <div className="login-prompt">

                            <span>
                                Already have an account?
                            </span>

                            <Link to="/login">
                                Sign in
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Register;