import React, { useState } from "react";
import "../../css/style.css";
import Footer from "./Footer";

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
                    {/* Contact Info */}
                    <div className="col-lg-4">
                        <div className="bg-light rounded h-100 p-4">
                            <h2 className="mb-4">Get In Touch</h2>
                            <div className="mb-3 d-flex">
                                <i className="bi bi-geo-alt text-primary fs-3 me-3"></i>
                                <div>
                                    <h6 className="mb-1">Address</h6>
                                    <p className="mb-0">123 Street, Lagos, Nigeria</p>
                                </div>
                            </div>
                            <div className="mb-3 d-flex">
                                <i className="bi bi-envelope-open text-primary fs-3 me-3"></i>
                                <div>
                                    <h6 className="mb-1">Email</h6>
                                    <p className="mb-0">info@example.com</p>
                                </div>
                            </div>
                            <div className="d-flex">
                                <i className="bi bi-phone-vibrate text-primary fs-3 me-3"></i>
                                <div>
                                    <h6 className="mb-1">Phone</h6>
                                    <p className="mb-0">+012 345 6789</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form + Map */}
                    <div className="col-lg-8">
                        <div className="row g-5">
                            {/* Form */}
                            <div className="col-md-6">
                                <h2 className="mb-4">Send Us a Message</h2>
                                {responseMessage && (
                                    <p className="alert alert-info">{responseMessage}</p>
                                )}
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            placeholder="Your Name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            placeholder="Your Email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            name="subject"
                                            className="form-control"
                                            placeholder="Subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <textarea
                                            name="message"
                                            className="form-control"
                                            rows="4"
                                            placeholder="Message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100">
                                        Send Message
                                    </button>
                                </form>
                            </div>

                            {/* Map */}
                            <div className="col-md-6">
                                <iframe
                                    className="w-100 rounded"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31722.645244244904!2d3.3792050575693153!3d6.524379265664302!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8d5cd19d7bb1%3A0x2d7e2fbb85c2f6e5!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1712045678901!5m2!1sen!2sng"
                                    frameBorder="0"
                                    style={{ minHeight: "350px", border: "0" }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Google Map"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Contact;
