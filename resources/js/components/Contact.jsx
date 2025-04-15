import React, { useState } from "react";
import "../../css/style.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMessage("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setResponseMessage(data.message);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setResponseMessage("Failed to send message.");
      }
    } catch (error) {
      setResponseMessage("Error connecting to the server.");
    }
  };

  return (
    <>
      {/* Search Modal */}
      <div className="modal fade" id="searchModal" tabIndex="-1">
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content" style={{ background: "rgba(9, 30, 62, .7)" }}>
            <div className="modal-header border-0">
              <button type="button" className="btn bg-white btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body d-flex align-items-center justify-content-center">
              <div className="input-group" style={{ maxWidth: "600px" }}>
                <input type="text" className="form-control bg-transparent border-primary p-3" placeholder="Type search keyword" />
                <button className="btn btn-primary px-4">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container-fluid bg-primary py-5 hero-header mb-5">
        <div className="row py-3">
          <div className="col-12 text-center">
            <h1 className="display-3 text-white animated zoomIn">Contact Us</h1>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="container py-5">
        <div className="row g-5">
          {/* Contact Details */}
          <div className="col-xl-4 col-lg-6 wow slideInUp" data-wow-delay="0.1s">
            <div className="bg-light rounded h-100 p-5">
              <div className="section-title">
                <h1 className="display-6 mb-4">Feel Free To Contact Us</h1>
              </div>
              <div className="d-flex align-items-center mb-2">
                <i className="bi bi-geo-alt fs-1 text-primary me-3"></i>
                <div className="text-start">
                  <h5 className="mb-0">Our Office</h5>
                  <span>123 Street, New York, USA</span>
                </div>
              </div>
              <div className="d-flex align-items-center mb-2">
                <i className="bi bi-envelope-open fs-1 text-primary me-3"></i>
                <div className="text-start">
                  <h5 className="mb-0">Email Us</h5>
                  <span>info@example.com</span>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <i className="bi bi-phone-vibrate fs-1 text-primary me-3"></i>
                <div className="text-start">
                  <h5 className="mb-0">Call Us</h5>
                  <span>+012 345 6789</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-6">
            <h1 className="display-6 mb-4">Send Us a Message</h1>
            {responseMessage && <p className="alert alert-info">{responseMessage}</p>}
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-12">
                  <input type="text" name="name" className="form-control" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="col-12">
                  <input type="email" name="email" className="form-control" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="col-12">
                  <input type="text" name="subject" className="form-control" placeholder="Subject" value={formData.subject} onChange={handleChange} />
                </div>
                <div className="col-12">
                  <textarea name="message" className="form-control" rows="5" placeholder="Message" value={formData.message} onChange={handleChange} required></textarea>
                </div>
                <div className="col-12">
                  <button className="btn btn-primary w-100" type="submit">
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Google Map */}
          <div className="col-lg-6">
          <iframe
  className="w-100"
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31722.645244244904!2d3.3792050575693153!3d6.524379265664302!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8d5cd19d7bb1%3A0x2d7e2fbb85c2f6e5!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1712045678901!5m2!1sen!2sng"
  frameBorder="0"
  style={{ minHeight: "400px", border: "0" }}
  allowFullScreen
></iframe>

          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
