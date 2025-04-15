import "./bootstrap";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Appointment from "./components/appointment";
import SearchDoctor from "./components/SearchDoctor";
import DoctorsList from "./components/DoctorsList";
import ServicePage from "./components/servicePage";
import Contact from "./components/Contact";
import TeamPage from "./components/teamPage";
import ServiceDetail from "./components/ServiceDetail"; // Create this component






const rootElement = document.getElementById("app");

if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <Router>
            <Navbar /> {/* Navbar stays outside Routes so it appears on all pages */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/appointments" element={<Appointment />} />
                <Route path="/doctors" element={<DoctorsList />} />
                <Route path="/search-doctor" element={<SearchDoctor />} />
                <Route path="/services" element={<ServicePage />} />
                <Route path="/services/:slug" element={<ServiceDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/team" element={<TeamPage />} />
                {/* <Route path="/team/:id" element={<TeamPage />} /> */}
            </Routes>
        </Router>
    );
} else {
    console.error("React root element not found!");
}
