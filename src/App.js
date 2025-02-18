import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import About from "./about";
import Services from "./services";
import Contact from "./contact";
import Price from "./price";
import Team from "./team";
import Appointment from "./appointment";
import Testimonial from "./testimonial";
import Login from "./Login";
import Register from "./Register";

function App() {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/price" element={<Price />} />
        <Route path="/team" element={<Team />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/testimonial" element={<Testimonial />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
      </Routes>
    </Router>
  );
}

export default App;
