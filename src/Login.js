import React, { useState } from "react";
import Navbar from "./Navbar";
import "./forms.css";
import { Link } from "react-router-dom";
import Footer from "./footer";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", formData);
    // Add authentication logic here
  };

  return (
  <>
    <Navbar />
    <div className="auth-container">
    <div className="auth-box">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="auth-button">Login</button>
      </form>
      <p className="auth-text">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  </div>
  <Footer />
</>
  );
};

export default Login;
