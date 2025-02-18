import React from "react";

const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg bg-white navbar-light shadow-sm px-5 py-3 py-lg-0">
        <a href="/" class="navbar-brand p-0">
            <h1 class="m-0 text-primary"><i class="fa fa-tooth me-2"></i>ToothCare</h1>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
            <div class="navbar-nav ms-auto py-0">
                <a href="/" class="nav-item nav-link active">Home</a>
                <a href="/about" className="nav-item nav-link">About</a>
                <a href="/service" class="nav-item nav-link">Service</a>
                <div class="nav-item dropdown">
                    <button class="nav-link dropdown-toggle btn" data-bs-toggle="dropdown">Pages</button>
                    <div class="dropdown-menu m-0">
                        <a href="/price" class="dropdown-item">Pricing Plan</a>
                        <a href="/team" class="dropdown-item">Our Dentist</a>
                        <a href="/testimonial" class="dropdown-item">Testimonial</a>
                        <a href="/appointment" class="dropdown-item">Appointment</a>
                    </div>
                </div>
                <a href="/contact" class="nav-item nav-link">Contact</a>
                <a href="/register" class="nav-item nav-link">Register</a>
                <a href="/login" class="nav-item nav-link">Login</a>
            </div>
            <button type="button" class="btn text-dark" data-bs-toggle="modal" data-bs-target="#searchModal"><i class="fa fa-search"></i></button>
            <a href="appointment.html" class="btn btn-primary py-2 px-4 ms-3">Appointment</a>
        </div>
    </nav>
    );
}
export default Navbar;