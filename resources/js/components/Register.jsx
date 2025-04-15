import React, { useState } from "react";
// import Navbar from "../components/Navbar";
import "../../css/forms.css";
import axios from "axios";
import Footer from "../components/Footer";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");

    try {
      // Ensure CSRF token is set
      await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie");

      // Send registration request
      const response = await axios.post("http://127.0.0.1:8000/api/register", formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // Required for Laravel Sanctum authentication
      });

      setSuccessMessage("Registration successful! Redirecting...");
      localStorage.setItem("token", response.data.token);

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        password_confirmation: "",
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: "An error occurred. Please try again." });
      }
    }
  };

  return (
    <div className="register-container">
      <div className="content">
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card shadow-lg p-4">
                <h2 className="text-center mb-4">Register</h2>

                {successMessage && <p className="text-success">{successMessage}</p>}
                {errors.general && <p className="text-danger">{errors.general}</p>}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                    {errors.name && <small className="text-danger">{errors.name[0]}</small>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
                    {errors.email && <small className="text-danger">{errors.email[0]}</small>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} required />
                    {errors.phone && <small className="text-danger">{errors.phone[0]}</small>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
                    {errors.password && <small className="text-danger">{errors.password[0]}</small>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} required />
                    {errors.password_confirmation && <small className="text-danger">{errors.password_confirmation[0]}</small>}
                  </div>

                  <button type="submit" className="btn btn-primary w-100">Register</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
