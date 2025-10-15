import "./bootstrap";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./context/AuthContext"; // 
import Echo from "laravel-echo";
import Pusher from "pusher-js";

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
import ServiceDetail from "./components/ServiceDetail";
import ChatBox from "./ChatBox";
import AdminRegister from "./admin/AdminRegister";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";



const rootElement = document.getElementById("app");
window.Pusher = Pusher;

const echo = new Echo({
    broadcaster: "pusher",
    key: "7633d3843f1432e54dc9", // 👈 use your real app key
    cluster: "mt1", // from your Pusher dashboard
    forceTLS: true
});

window.Echo = echo; // 👈 make it global so ChatBox can use it


echo.channel("chat").listen(".message.sent", (e) => {
    console.log("📩 New Message:", e);
    // e = { user: "Tester", message: "Hello from backend!" }
});

if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <AuthProvider>  {/* ✅ Wrap everything here */}
            <Router>
                <Navbar />
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
                    <Route path="/admin/register" element={<AdminRegister />} />
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />

                </Routes>

                {/* Floating ChatBox */}
                <ChatBox />

                {/* Toast Notifications */}
                <ToastContainer position="top-right" autoClose={3000} theme="colored" />
            </Router>
        </AuthProvider>
    );
} else {
    console.error("React root element not found!");
}
