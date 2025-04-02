import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../css/forms.css";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // To redirect after login

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            console.log("Attempting login...");

            const response = await axios.post("http://127.0.0.1:8000/api/login", {
                email,
                password,
            });

            console.log("Login successful:", response.data); // Debug API response

            if (response.data.token) {
                localStorage.setItem("auth_token", response.data.token); // Store the token correctly
                console.log("Stored Token:", localStorage.getItem("auth_token")); // Debug storage

                // Set token for future API requests
                axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;

                navigate("/"); // Redirect to home/dashboard
            }
        } catch (err) {
            console.error("Login failed:", err.response ? err.response.data : err);
            setError(err.response?.data?.message || "Invalid credentials");
        } finally {
            setLoading(false);
        }
    };


    return (
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
            </form>
        </div>
    );
};

export default Login;
