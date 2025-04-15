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

const Home = () => {
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
                                        <a
                                            href="/contact"
                                            className="btn btn-secondary py-md-3 px-md-5 animated slideInRight"
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
                                        Book an Appointment
                                    </a>
                                </div>
                            </div>
                            <div
                                className="col-lg-4 wow zoomIn"
                                data-wow-delay="0.3s"
                            >
                                <div
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
                    class="container-fluid bg-primary bg-appointment my-5 wow fadeInUp d-flex justify-content-center text-center"
                    data-wow-delay="0.1s"
                >
                    <div class="container">
                        <div class="row gx-5 justify-content-center">
                            <div class="col-lg-6 py-5">
                                <div class="py-5">
                                    <h1 class="display-5 text-white mb-4">
                                        We Are A Certified and Award Winning
                                        Dental Clinic You Can Trust
                                    </h1>
                                    <p class="text-white mb-0">
                                        Eirmod sed tempor lorem ut dolores.
                                        Aliquyam sit sadipscing kasd ipsum.
                                        Dolor ea et dolore et at sea ea at
                                        dolor, justo ipsum duo rebum sea
                                        invidunt voluptua. Eos vero eos vero ea
                                        et dolore eirmod et. Dolores diam duo
                                        invidunt lorem. Elitr ut dolores magna
                                        sit. Sea dolore sanctus sed et. Takimata
                                        takimata sanctus sed.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    class="container-fluid py-5 wow fadeInUp"
                    data-wow-delay="0.1s"
                >
                    <div class="container">
                        <div class="row g-5 mb-5">
                            <div
                                className="col-lg-5 wow zoomIn"
                                data-wow-delay="0.3s"
                                style={{ minHeight: "400px" }}
                            >
                                <div class="twentytwenty-container position-relative h-100 rounded overflow-hidden">
                                    <img
                                        className="position-absolute w-100 h-100"
                                        src="image/patient.jpg"
                                        style={{ objectFit: "cover" }}
                                        alt="Before"
                                    />
                                    <img
                                        className="position-absolute w-100 h-100"
                                        src="image/patient.jpg"
                                        style={{ objectFit: "cover" }}
                                        alt="After"
                                    />
                                </div>
                            </div>
                            <div class="col-lg-7">
                                <div class="section-title mb-5">
                                    <h1 class="display-5 mb-0">
                                        We Offer The Best Quality Dental
                                        Services
                                    </h1>
                                </div>
                                <div class="row g-5">
                                    <div
                                        class="col-md-6 service-item wow zoomIn"
                                        data-wow-delay="0.6s"
                                    >
                                        <div class="rounded-top overflow-hidden">
                                            <img
                                                class="img-fluid"
                                                src="image/surgery.jpg"
                                                alt=""
                                            />
                                        </div>
                                        <div class="position-relative bg-light rounded-bottom text-center p-4">
                                            <h5 class="m-0">
                                                Cosmetic Dentistry
                                            </h5>
                                        </div>
                                    </div>
                                    <div
                                        class="col-md-6 service-item wow zoomIn"
                                        data-wow-delay="0.9s"
                                    >
                                        <div class="rounded-top overflow-hidden">
                                            <img
                                                class="img-fluid"
                                                src="image/surgery2.jpg"
                                                alt=""
                                            />
                                        </div>
                                        <div class="position-relative bg-light rounded-bottom text-center p-4">
                                            <h5 class="m-0">Dental Implants</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row g-5 wow fadeInUp" data-wow-delay="0.1s">
                            <div class="col-lg-7">
                                <div class="row g-5">
                                    <div
                                        class="col-md-6 service-item wow zoomIn"
                                        data-wow-delay="0.3s"
                                    >
                                        <div class="rounded-top overflow-hidden">
                                            <img
                                                class="img-fluid"
                                                src="image/dental-surgery.jpg"
                                                alt=""
                                            />
                                        </div>
                                        <div class="position-relative bg-light rounded-bottom text-center p-4">
                                            <h5 class="m-0">Dental Bridges</h5>
                                        </div>
                                    </div>
                                    <div
                                        class="col-md-6 service-item wow zoomIn"
                                        data-wow-delay="0.6s"
                                    >
                                        <div class="rounded-top overflow-hidden">
                                            <img
                                                class="img-fluid"
                                                src="image/teeth-whitening.jpg"
                                                alt=""
                                            />
                                        </div>
                                        <div class="position-relative bg-light rounded-bottom text-center p-4">
                                            <h5 class="m-0">Teeth Whitening</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="col-lg-5 service-item wow zoomIn"
                                data-wow-delay="0.9s"
                            >
                                <div class="position-relative bg-primary rounded h-100 d-flex flex-column align-items-center justify-content-center text-center p-4">
                                    <h3 class="text-white mb-3">
                                        Make Appointment
                                    </h3>
                                    <p class="text-white mb-3">
                                        Clita ipsum magna kasd rebum at ipsum
                                        amet dolor justo dolor est magna stet
                                        eirmod
                                    </p>
                                    <h2 class="text-white mb-0">
                                        +012 345 6789
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="container-fluid py-5">
                    <div class="container">
                        <div class="row g-5">
                            <div
                                class="col-lg-4 wow slideInUp"
                                data-wow-delay="0.1s"
                            >
                                <div class="section-title bg-light rounded h-100 p-5">
                                    <h5 class="position-relative d-inline-block text-primary text-uppercase">
                                        Our Dentist
                                    </h5>
                                    <h1 class="display-6 mb-4">
                                        Meet Our Certified & Experienced Dentist
                                    </h1>
                                    <a
                                        href="appointment.html"
                                        class="btn btn-primary py-3 px-5"
                                    >
                                        Appointment
                                    </a>
                                </div>
                            </div>
                            <div
                                class="col-lg-4 wow slideInUp"
                                data-wow-delay="0.3s"
                            >
                                <div class="team-item">
                                    <div
                                        className="position-relative rounded-top"
                                        style={{ zIndex: 1 }}
                                    >
                                        <img
                                            class="img-fluid rounded-top w-100"
                                            src="img/team-1.jpg"
                                            alt=""
                                        />
                                        <div class="position-absolute top-100 start-50 translate-middle bg-light rounded p-2 d-flex">
                                            <button className="btn btn-primary btn-square m-1">
                                                <i className="fab fa-twitter fw-normal"></i>
                                            </button>
                                            <button className="btn btn-primary btn-square m-1">
                                                <i className="fab fa-facebook-f fw-normal"></i>
                                            </button>
                                            <button className="btn btn-primary btn-square m-1">
                                                <i className="fab fa-linkedin-in fw-normal"></i>
                                            </button>
                                            <button className="btn btn-primary btn-square m-1">
                                                <i className="fab fa-instagram fw-normal"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="team-text position-relative bg-light text-center rounded-bottom p-4 pt-5">
                                        <h4 class="mb-2">Dr. John Doe</h4>
                                        <p class="text-primary mb-0">
                                            Implant Surgeon
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="col-lg-4 wow slideInUp"
                                data-wow-delay="0.6s"
                            >
                                <div class="team-item">
                                    <div
                                        className="position-relative rounded-top"
                                        style={{ zIndex: 1 }}
                                    >
                                        <img
                                            class="img-fluid rounded-top w-100"
                                            src="img/team-2.jpg"
                                            alt=""
                                        />
                                        <div class="position-absolute top-100 start-50 translate-middle bg-light rounded p-2 d-flex">
                                            <button class="btn btn-primary btn-square m-1">
                                                <i class="fab fa-twitter fw-normal"></i>
                                            </button>
                                            <button class="btn btn-primary btn-square m-1">
                                                <i class="fab fa-facebook-f fw-normal"></i>
                                            </button>
                                            <button class="btn btn-primary btn-square m-1">
                                                <i class="fab fa-linkedin-in fw-normal"></i>
                                            </button>
                                            <button class="btn btn-primary btn-square m-1">
                                                <i class="fab fa-instagram fw-normal"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="team-text position-relative bg-light text-center rounded-bottom p-4 pt-5">
                                        <h4 class="mb-2">Dr. John Doe</h4>
                                        <p class="text-primary mb-0">
                                            Implant Surgeon
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="col-lg-4 wow slideInUp"
                                data-wow-delay="0.1s"
                            >
                                <div class="team-item">
                                    <div
                                        class="position-relative rounded-top"
                                        style={{ zIndex: 1 }}
                                    >
                                        <img
                                            class="img-fluid rounded-top w-100"
                                            src="img/team-3.jpg"
                                            alt=""
                                        />
                                        <div class="position-absolute top-100 start-50 translate-middle bg-light rounded p-2 d-flex">
                                            <button class="btn btn-primary btn-square m-1">
                                                <i class="fab fa-twitter fw-normal"></i>
                                            </button>
                                            <button class="btn btn-primary btn-square m-1">
                                                <i class="fab fa-facebook-f fw-normal"></i>
                                            </button>
                                            <button class="btn btn-primary btn-square m-1">
                                                <i class="fab fa-linkedin-in fw-normal"></i>
                                            </button>
                                            <button class="btn btn-primary btn-square m-1">
                                                <i class="fab fa-instagram fw-normal"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="team-text position-relative bg-light text-center rounded-bottom p-4 pt-5">
                                        <h4 class="mb-2">Dr. John Doe</h4>
                                        <p class="text-primary mb-0">
                                            Implant Surgeon
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="col-lg-4 wow slideInUp"
                                data-wow-delay="0.3s"
                            >
                                <div class="team-item">
                                    <div
                                        class="position-relative rounded-top"
                                        style={{ zIndex: 1 }}
                                    >
                                        <img
                                            className="img-fluid rounded-top w-100"
                                            src="img/team-4.jpg"
                                            alt=""
                                        />
                                        <div class="position-absolute top-100 start-50 translate-middle bg-light rounded p-2 d-flex">
                                            <button class="btn btn-primary btn-square m-1">
                                                <i class="fab fa-twitter fw-normal"></i>
                                            </button>
                                            <button class="btn btn-primary btn-square m-1">
                                                <i class="fab fa-facebook-f fw-normal"></i>
                                            </button>
                                            <button class="btn btn-primary btn-square m-1">
                                                <i class="fab fa-linkedin-in fw-normal"></i>
                                            </button>
                                            <button class="btn btn-primary btn-square m-1">
                                                <i class="fab fa-instagram fw-normal"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="team-text position-relative bg-light text-center rounded-bottom p-4 pt-5">
                                        <h4 class="mb-2">Dr. John Doe</h4>
                                        <p class="text-primary mb-0">
                                            Implant Surgeon
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="col-lg-4 wow slideInUp"
                                data-wow-delay="0.6s"
                            >
                                <div class="team-item">
                                    <div
                                        class="position-relative rounded-top"
                                        style={{ zIndex: 1 }}
                                    >
                                        <img
                                            class="img-fluid rounded-top w-100"
                                            src="img/team-5.jpg"
                                            alt=""
                                        />
                                        <div class="position-absolute top-100 start-50 translate-middle bg-light rounded p-2 d-flex">
                                            <button class="btn btn-primary btn-square m-1">
                                                <i class="fab fa-twitter fw-normal"></i>
                                            </button>
                                            <button class="btn btn-primary btn-square m-1">
                                                <i class="fab fa-facebook-f fw-normal"></i>
                                            </button>
                                            <button class="btn btn-primary btn-square m-1">
                                                <i class="fab fa-linkedin-in fw-normal"></i>
                                            </button>
                                            <button class="btn btn-primary btn-square m-1">
                                                <i class="fab fa-instagram fw-normal"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="team-text position-relative bg-light text-center rounded-bottom p-4 pt-5">
                                        <h4 class="mb-2">Dr. John Doe</h4>
                                        <p class="text-primary mb-0">
                                            Implant Surgeon
                                        </p>
                                    </div>
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
            <Footer />
        </>
    );
};

export default Home;
