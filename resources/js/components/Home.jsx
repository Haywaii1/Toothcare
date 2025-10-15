import React from "react";
// import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "animate.css/animate.min.css";
import "jquery/dist/jquery.min.js";
import "owl.carousel/dist/assets/owl.carousel.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../../css/style.css";
import Footer from "./Footer";
import Chat from "./chat";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';



const Home = () => {

    useEffect(() => {
        AOS.init({
            duration: 1000, // duration of animation
            once: true      // only animate once
        });
    }, []);

    return (
        <>
            <div class="container-fluid bg-light ps-5 pe-0 d-none d-lg-block">
                <div class="row gx-0">
                    <div class="col-md-6 text-center text-lg-start mb-2 mb-lg-0">
                        <div class="d-inline-flex align-items-center">
                            <small class="py-2">
                                <i class="far fa-clock text-primary me-2"></i>
                                Opening Hours: Mon - Tues : 6.00 am - 10.00 pm,
                                Sunday Closed{" "}
                            </small>
                        </div>
                    </div>
                    <div class="col-md-6 text-center text-lg-end">
                        <div class="position-relative d-inline-flex align-items-center bg-primary text-white top-shape px-5">
                            <div class="me-3 pe-3 border-end py-2">
                                <p class="m-0">
                                    <i class="fa fa-envelope-open me-2"></i>
                                    info@example.com
                                </p>
                            </div>
                            <div class="py-2">
                                <p class="m-0">
                                    <i class="fa fa-phone-alt me-2"></i>+012 345
                                    6789
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className="modal fade" id="searchModal" tabIndex="-1">
                    <div className="modal-dialog modal-fullscreen">
                        <div
                            className="modal-content"
                            style={{ background: "rgba(9, 30, 62, .7)" }}
                        >
                            <div className="modal-header border-0">
                                <button
                                    type="button"
                                    className="btn bg-white btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body d-flex align-items-center justify-content-center">
                                <div
                                    className="input-group"
                                    style={{ maxWidth: "600px" }}
                                >
                                    <input
                                        type="text"
                                        className="form-control bg-transparent border-primary p-3"
                                        placeholder="Type search keyword"
                                    />
                                    <button className="btn btn-primary px-4">
                                        <i className="bi bi-search"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Carousel Start */}
                <div className="container-fluid p-0">
                    <div
                        id="header-carousel"
                        className="carousel slide carousel-fade"
                        data-bs-ride="carousel"
                    >
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img
                                    className="w-100"
                                    src="image/doc1.jpeg"
                                    alt="Dental Treatment"
                                    style={{ maxWidth: "auto", height: "auto" }}
                                />
                                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                    <div
                                        className="p-3"
                                        style={{ maxWidth: "900px" }}
                                    >
                                        <h5 className="text-white text-uppercase mb-3 animated slideInDown" data-aos="fade-left">
                                            Keep Your Teeth Healthy
                                        </h5>
                                        <h1 className="display-1 text-white mb-md-4 animated zoomIn" data-aos="fade-right">
                                            Take The Best Quality Dental
                                            Treatment
                                        </h1>
                                        <a
                                            href="/appointments"
                                            className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft"
                                            data-aos="flip-left">
                                            Appointment
                                        </a>
                                        <a
                                            href="/contact"
                                            className="btn btn-secondary py-md-3 px-md-5 animated slideInRight"
                                            data-aos="flip-left"
                                        >
                                            Contact Us
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img
                                    className="w-100"
                                    src="image/dentists.jpg"
                                    alt="Dental Treatment"
                                />
                                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                    <div
                                        className="p-3"
                                        style={{ maxWidth: "900px" }}
                                    >
                                        <h5 className="text-white text-uppercase mb-3 animated slideInDown">
                                            Keep Your Teeth Healthy
                                        </h5>
                                        <h1 className="display-1 text-white mb-md-4 animated zoomIn">
                                            Take The Best Quality Dental
                                            Treatment
                                        </h1>
                                        <a
                                            href="/appointments"
                                            className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft"
                                        >
                                            Appointment
                                        </a>
                                        <button
                                            href="/contact"
                                            className="btn btn-secondary py-md-3 px-md-5 animated slideInRight"
                                        >
                                            Contact Us
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target="#header-carousel"
                            data-bs-slide="prev"
                        >
                            <span
                                className="carousel-control-prev-icon"
                                aria-hidden="true"
                            ></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target="#header-carousel"
                            data-bs-slide="next"
                        >
                            <span
                                className="carousel-control-next-icon"
                                aria-hidden="true"
                            ></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>

                <div className="container-fluid banner mb-5">
                    <div className="container">
                        <div className="row gx-0">
                            <div
                                className="col-lg-4 wow zoomIn"
                                data-wow-delay="0.1s"
                            >
                                <div
                                    data-aos="fade-right"
                                    className="bg-primary d-flex flex-column p-5"
                                    style={{ height: "300px" }}
                                >
                                    <h3 className="text-white mb-3">
                                        Opening Hours
                                    </h3>
                                    <div className="d-flex justify-content-between text-white mb-3">
                                        <h6 className="text-white mb-0">
                                            Mon - Fri
                                        </h6>
                                        <p className="mb-0"> 8:00am - 9:00pm</p>
                                    </div>
                                    <div className="d-flex justify-content-between text-white mb-3">
                                        <h6 className="text-white mb-0">
                                            Saturday
                                        </h6>
                                        <p className="mb-0"> 8:00am - 7:00pm</p>
                                    </div>
                                    <div className="d-flex justify-content-between text-white mb-3">
                                        <h6 className="text-white mb-0">
                                            Sunday
                                        </h6>
                                        <p className="mb-0"> 8:00am - 5:00pm</p>
                                    </div>

                                    <a
                                        href="/appointments"
                                        className="btn btn-light py-md-2 px-md-5 me-3 animated slideInLeft"
                                    >
                                        Book Now
                                    </a>
                                </div>
                            </div>
                            <div
                                className="col-lg-4 wow zoomIn"
                                data-wow-delay="0.3s"
                            >
                                <div
                                    data-aos="fade-up"
                                    className="bg-dark d-flex flex-column p-5"
                                    style={{ height: "300px" }}
                                >
                                    <h3 className="text-white mb-3">
                                        Our Services Includes
                                    </h3>
                                    <div>
                                        <ul className="text-white mb-0">
                                            <li>Teeth whitening</li>
                                            <li>Dental Implants</li>
                                            <li>Cavity Filling</li>
                                            <li>Root Canal</li>
                                            <li>Extraction</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="col-lg-4 wow zoomIn"
                                data-wow-delay="0.6s"
                            >
                                <div
                                    data-aos="fade-left"
                                    className="bg-secondary d-flex flex-column p-5"
                                    style={{ height: "300px" }}
                                >
                                    <h3 className="text-white mb-3">
                                        Call to Book
                                    </h3>
                                    <p className="text-white">
                                        Ipsum erat ipsum dolor clita rebum no
                                        rebum dolores labore, ipsum magna at eos
                                        et eos amet.
                                    </p>
                                    <h2 className="text-white mb-0">
                                        +23470 8022 6941
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div
                    className="container-fluid bg-primary bg-appointment my-5 wow fadeInUp d-flex justify-content-center text-center position-relative overflow-hidden"
                    data-wow-delay="0.1s"
                >
                    {/* Background Video */}
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="position-absolute w-100 h-100 object-fit-cover opacity-50"
                        style={{ top: 0, left: 0, zIndex: 0 }}
                    >
                        <source src="/videos/den.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    {/* Foreground Content */}
                    <div className="container position-relative" style={{ zIndex: 1 }}>
                        <div className="row gx-5 justify-content-center">
                            <div className="col-lg-6 py-5">
                                <div className="py-5">
                                    <h1 className="display-5 text-white mb-4">
                                        We Are A Certified and Award Winning Dental Clinic You Can Trust
                                    </h1>
                                    <p className="text-white mb-0">
                                        Eirmod sed tempor lorem ut dolores. Aliquyam sit sadipscing kasd ipsum...
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="container-fluid py-5" data-aos="fade-up">
  <div className="container">
    <div className="row g-5 mb-5">
      {/* Before & After Image */}
      <div
        className="col-lg-5"
        data-aos="zoom-in"
        data-aos-delay="200"
        style={{ minHeight: "400px" }}
      >
        <div className="twentytwenty-container position-relative h-100 rounded overflow-hidden">
          <img
            className="position-absolute w-100 h-100"
            src="image/patient.jpg"
            alt="Before"
            style={{ objectFit: "cover" }}
            data-aos="fade-left"
          />
          <img
            className="position-absolute w-100 h-100"
            src="image/patient.jpg"
            alt="After"
            style={{ objectFit: "cover" }}
            data-aos="fade-right"
            data-aos-delay="300"
          />
        </div>
      </div>

      {/* Section Title and First 2 Services */}
      <div className="col-lg-7">
        <div className="section-title mb-5">
          <h1 className="display-5 mb-0" data-aos="flip-left" style={{ color: "#0d6efd" }}>
            We Offer The Best Quality Dental Services
          </h1>
        </div>
        <div className="row g-5">
          <div className="col-md-6" data-aos="fade-up" data-aos-delay="300">
            <div className="rounded-top overflow-hidden">
              <img className="img-fluid" src="image/surgery.jpg" alt="Cosmetic Dentistry" />
            </div>
            <div className="bg-light rounded-bottom text-center p-4">
              <h5 className="m-0" style={{ color: "#0d6efd" }}>Cosmetic Dentistry</h5>
            </div>
          </div>
          <div className="col-md-6" data-aos="fade-up" data-aos-delay="400">
            <div className="rounded-top overflow-hidden">
              <img className="img-fluid" src="image/surgery2.jpg" alt="Dental Implants" />
            </div>
            <div className="bg-light rounded-bottom text-center p-4">
              <h5 className="m-0" style={{ color: "#0d6efd" }}>Dental Implants</h5>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Remaining Services and CTA */}
    <div className="row g-5">
      <div className="col-lg-7">
        <div className="row g-5">
          <div className="col-md-6" data-aos="fade-up" data-aos-delay="200">
            <div className="rounded-top overflow-hidden">
              <img className="img-fluid" src="image/dental-surgery.jpg" alt="Dental Bridges" />
            </div>
            <div className="bg-light rounded-bottom text-center p-4">
              <h5 className="m-0" style={{ color: "#0d6efd" }}>Dental Bridges</h5>
            </div>
          </div>
          <div className="col-md-6" data-aos="fade-up" data-aos-delay="300">
            <div className="rounded-top overflow-hidden">
              <img className="img-fluid" src="image/teeth-whitening.jpg" alt="Teeth Whitening" />
            </div>
            <div className="bg-light rounded-bottom text-center p-4">
              <h5 className="m-0" style={{ color: "#0d6efd" }}>Teeth Whitening</h5>
            </div>
          </div>
        </div>
      </div>

      <div
        className="col-lg-5"
        data-aos="zoom-in"
        data-aos-delay="400"
      >
        <div className="bg-primary rounded h-100 d-flex flex-column align-items-center justify-content-center text-center p-4">
          <h3 className="text-white mb-3">Make Appointment</h3>
          <p className="text-white mb-3">
            Clita ipsum magna kasd rebum at ipsum amet dolor justo dolor est magna stet eirmod
          </p>
          <h2 className="text-white mb-0">+012 345 6789</h2>
        </div>
      </div>
    </div>
  </div>
</div>


                <a
                    href="#"
                    className="btn btn-lg btn-primary btn-lg-square rounded back-to-top"
                >
                    <i className="bi bi-arrow-up"></i>
                </a>
            </div>
            <div>
                <Chat />
            </div>
            <Footer />
        </>
    );
};

export default Home;
