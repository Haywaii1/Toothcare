import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../../css/forms.css";
import Footer from "../components/Footer";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false); // 👈 Remember me state
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/login",
                {
                    email,
                    password,
                    remember: rememberMe, // 👈 Pass to backend if needed
                }
            );

            if (response.data.token) {
                localStorage.setItem("auth_token", response.data.token);
                window.dispatchEvent(new Event("authChanged"));
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${response.data.token}`;
                navigate("/");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="login-container">
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    {/* Move this part below the button */}
                    <div className="remember-me">
                        <label className="remember-label">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                            />
                            <span>Remember Me</span>
                        </label>
                    </div>
                </form>

                <p style={{ marginTop: "1rem" }}>
                    Don't have an account?{" "}
                    <Link to="/register">Register here</Link>
                </p>
            </div>

            <Footer />
        </div>
    );
};

export default Login;
