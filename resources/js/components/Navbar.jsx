import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", checkAuth); // Listen for storage changes
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false); // Update state
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white navbar-light shadow-sm px-5 py-3 py-lg-0">
      <NavLink to="/" className="navbar-brand p-0">
        <h1 className="m-0 text-primary">
          <i className="fa fa-tooth me-2"></i>ToothCare
        </h1>
      </NavLink>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav ms-auto py-0">
          <NavLink to="/" className="nav-item nav-link">Home</NavLink>
          <NavLink to="/about" className="nav-item nav-link">About</NavLink>
          <NavLink to="/services" className="nav-item nav-link">Services</NavLink>
          <div className="nav-item dropdown">
            <button className="nav-link dropdown-toggle btn" data-bs-toggle="dropdown">
              Pages
            </button>
            <div className="dropdown-menu m-0">
              <NavLink to="/price" className="dropdown-item">Pricing Plan</NavLink>
              <NavLink to="/team" className="dropdown-item">Our Dentist</NavLink>
              <NavLink to="/testimonial" className="dropdown-item">Testimonial</NavLink>
              <NavLink to="/appointment" className="dropdown-item">Appointment</NavLink>
            </div>
          </div>
          <NavLink to="/contact" className="nav-item nav-link">Contact</NavLink>

          {/* Hide Register/Login when logged in */}
          {!isAuthenticated ? (
            <>
              <NavLink to="/register" className="nav-item nav-link">Register</NavLink>
              <NavLink to="/login" className="nav-item nav-link">Login</NavLink>
            </>
          ) : (
            <button className="nav-item nav-link btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>

        <button type="button" className="btn text-dark" data-bs-toggle="modal" data-bs-target="#searchModal">
          <i className="fa fa-search"></i>
        </button>
        <NavLink to="/appointments" className="btn btn-primary py-2 px-4 ms-3">
          Appointment
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
