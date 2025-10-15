import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/admin/login", form);
      
      // Example: store token if returned
      localStorage.setItem("adminToken", res.data.token);
      
      setMessage("✅ Login successful!");
      navigate("/admin/dashboard"); // redirect after login
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: "400px",
      margin: "50px auto",
      padding: "2rem",
      border: "1px solid #ddd",
      borderRadius: "8px",
      boxShadow: "0px 4px 12px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter admin email"
            value={form.email}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "0.6rem",
              marginTop: "0.4rem",
              border: "1px solid #ccc",
              borderRadius: "5px"
            }}
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "0.6rem",
              marginTop: "0.4rem",
              border: "1px solid #ccc",
              borderRadius: "5px"
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "0.8rem",
            backgroundColor: "#2F54EB",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {message && (
        <p style={{ textAlign: "center", marginTop: "1rem", color: message.startsWith("✅") ? "green" : "red" }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default AdminLogin;
