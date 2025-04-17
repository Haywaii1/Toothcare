import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("auth_token")
  );
  const idleTimeoutRef = useRef(null);
  const IDLE_LIMIT = 60 * 60 * 1000; // 60 minutes in ms

  // Checks and sets auth state
  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(!!localStorage.getItem("auth_token"));
    };

    window.addEventListener("authChanged", checkAuth);
    window.addEventListener("storage", checkAuth);
    checkAuth();

    return () => {
      window.removeEventListener("authChanged", checkAuth);
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    window.dispatchEvent(new Event("authChanged"));
    navigate("/login");
  };

  // Idle timeout setup
  useEffect(() => {
    if (!isAuthenticated) return;

    const resetTimeout = () => {
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      idleTimeoutRef.current = setTimeout(() => {
        alert("You have been logged out due to inactivity.");
        handleLogout();
      }, IDLE_LIMIT);
    };

    const activityEvents = ["mousemove", "keydown", "click", "scroll"];
    activityEvents.forEach((event) =>
      window.addEventListener(event, resetTimeout)
    );

    resetTimeout(); // Start the timer on mount

    return () => {
      activityEvents.forEach((event) =>
        window.removeEventListener(event, resetTimeout)
      );
      clearTimeout(idleTimeoutRef.current);
    };
  }, [isAuthenticated]);

  return (
    <nav className="navbar navbar-expand-lg bg-white navbar-light shadow-sm px-5 py-3 py-lg-0">
      <NavLink to="/" className="navbar-brand p-0">
        <h1 className="m-0 text-primary">
          <i className="fa fa-tooth me-2"></i>ToothCare
        </h1>
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav ms-auto py-0">
          <NavLink to="/" className="nav-item nav-link">
            Home
          </NavLink>
          <NavLink to="/about" className="nav-item nav-link">
            About
          </NavLink>
          <NavLink to="/services" className="nav-item nav-link">
            Services
          </NavLink>
          <NavLink to="/team" className="nav-item nav-link">
            Team
          </NavLink>
          <NavLink to="/contact" className="nav-item nav-link">
            Contact
          </NavLink>

          {!isAuthenticated ? (
            <>
              <NavLink to="/register" className="nav-item nav-link">
                Register
              </NavLink>
              <NavLink to="/login" className="nav-item nav-link">
                Login
              </NavLink>
            </>
          ) : (
            <button className="nav-item nav-link btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>

        <NavLink
          to="/appointments"
          className="btn btn-primary py-2 px-4 ms-3"
        >
          Appointment
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
