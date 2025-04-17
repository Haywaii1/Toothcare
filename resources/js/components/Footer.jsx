import React from "react";
import { Link } from "react-router-dom";
import Newsletter from "./newsletter";

const Footer = () => {
    return (
        <>
            {/* Newsletter Signup */}
            <div
                className="container-fluid position-relative pt-5 wow fadeInUp"
                data-wow-delay="0.1s"
                style={{ zIndex: 1 }}
            >
                <Newsletter />
            </div>

            {/* Footer Info Sections */}
            <div
    className="container-fluid bg-dark text-light py-5 wow fadeInUp"
    data-wow-delay="0.3s"
    style={{ marginTop: "-75px" }}
>
    <div className="container pt-5">
        <div className="row g-5 justify-content-center">
            {/* Quick Links */}
            <div className="col-lg-3 col-md-6 text-start">
                <h3 className="text-white mb-4">Quick Links</h3>
                <div className="d-flex flex-column align-items-start">
                    <Link to="/" className="text-light mb-2">
                        <i className="bi bi-arrow-right text-primary me-2"></i>Home
                    </Link>
                    <Link to="/about" className="text-light mb-2">
                        <i className="bi bi-arrow-right text-primary me-2"></i>About Us
                    </Link>
                    <Link to="/services" className="text-light mb-2">
                        <i className="bi bi-arrow-right text-primary me-2"></i>Our Services
                    </Link>
                    <Link to="/blog" className="text-light mb-2">
                        <i className="bi bi-arrow-right text-primary me-2"></i>Latest Blog
                    </Link>
                    <Link to="/contact" className="text-light">
                        <i className="bi bi-arrow-right text-primary me-2"></i>Contact Us
                    </Link>
                </div>
            </div>

            {/* Contact Info */}
            <div className="col-lg-3 col-md-6 text-start">
                <h3 className="text-white mb-4">Get In Touch</h3>
                <p className="mb-2">
                    <i className="bi bi-geo-alt text-primary me-2"></i>123 Street, New York, USA
                </p>
                <p className="mb-2">
                    <i className="bi bi-envelope-open text-primary me-2"></i>info@example.com
                </p>
                <p className="mb-0">
                    <i className="bi bi-telephone text-primary me-2"></i>+012 345 67890
                </p>
            </div>

            {/* Social Links */}
            <div className="col-lg-3 col-md-6 text-start">
                <h3 className="text-white mb-4">Follow Us</h3>
                <div className="d-flex justify-content-start">
                    <a className="btn btn-lg btn-primary btn-lg-square rounded me-2" href="#">
                        <i className="fab fa-twitter fw-normal"></i>
                    </a>
                    <a className="btn btn-lg btn-primary btn-lg-square rounded me-2" href="#">
                        <i className="fab fa-facebook-f fw-normal"></i>
                    </a>
                    <a className="btn btn-lg btn-primary btn-lg-square rounded me-2" href="#">
                        <i className="fab fa-linkedin-in fw-normal"></i>
                    </a>
                    <a className="btn btn-lg btn-primary btn-lg-square rounded" href="#">
                        <i className="fab fa-instagram fw-normal"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>


            {/* Bottom Bar */}
            <div
                className="container-fluid text-light py-4"
                style={{ background: "#051225" }}
            >
                <div className="container">
                    <div className="row g-0 align-items-center">
                        <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                            <p className="mb-0">
                                &copy;{" "}
                                <span className="text-white border-bottom">
                                    Your Site Name
                                </span>
                                . All Rights Reserved.
                            </p>
                        </div>
                        <div className="col-md-6 text-center text-md-end">
                            <p className="mb-0">
                                Designed by{" "}
                                <a
                                    className="text-white border-bottom"
                                    href="https://htmlcodex.com"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    HayWare Tech
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Back to Top Button */}
            <a
                href="#"
                className="btn btn-lg btn-primary btn-lg-square rounded back-to-top"
            >
                <i className="bi bi-arrow-up"></i>
            </a>
        </>
    );
};

export default Footer;
