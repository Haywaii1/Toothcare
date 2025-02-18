import React from "react";
import Navbar from "./Navbar";

const Team = () => {
  return (
        <div>
        <div>
            <Navbar />
        </div>
        <div>
        <div class="container-fluid bg-light ps-5 pe-0 d-none d-lg-block">
        <div class="row gx-0">
            <div class="col-md-6 text-center text-lg-start mb-2 mb-lg-0">
                <div class="d-inline-flex align-items-center">
                    <small class="py-2"><i class="far fa-clock text-primary me-2"></i>Opening Hours: Mon - Tues : 6.00 am - 10.00 pm, Sunday Closed </small>
                </div>
            </div>
            <div class="col-md-6 text-center text-lg-end">
                <div class="position-relative d-inline-flex align-items-center bg-primary text-white top-shape px-5">
                    <div class="me-3 pe-3 border-end py-2">
                        <p class="m-0"><i class="fa fa-envelope-open me-2"></i>info@example.com</p>
                    </div>
                    <div class="py-2">
                        <p class="m-0"><i class="fa fa-phone-alt me-2"></i>+012 345 6789</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="searchModal" tabindex="-1">
        <div class="modal-dialog modal-fullscreen">
            <div class="modal-content" style={{ background: 'rgba(9, 30, 62, .7)' }}>
                <div class="modal-header border-0">
                    <button type="button" class="btn bg-white btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body d-flex align-items-center justify-content-center">
                    <div class="input-group" style={{ maxWidth: '600px' }}>
                        <input type="text" class="form-control bg-transparent border-primary p-3" placeholder="Type search keyword" />
                        <button class="btn btn-primary px-4"><i class="bi bi-search"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* Full Screen Search End */}


    {/* Hero Start */}
    <div class="container-fluid bg-primary py-5 hero-header mb-5">
        <div class="row py-3">
            <div class="col-12 text-center">
                <h1 class="display-3 text-white animated zoomIn">Dentist</h1>
                <a href="/home" class="h4 text-white">Home</a>
                <i class="far fa-circle text-white px-2"></i>
                <a href="/dentist" class="h4 text-white">Dentist</a>
            </div>
        </div>
    </div>
    {/* Hero End */}


    {/* Team Start */}
    <div class="container-fluid py-5">
        <div class="container">
            <div class="row g-5">
                <div class="col-lg-4 wow slideInUp" data-wow-delay="0.1s">
                    <div class="section-title bg-light rounded h-100 p-5">
                        <h5 class="position-relative d-inline-block text-primary text-uppercase">Our Dentist</h5>
                        <h1 class="display-6 mb-4">Meet Our Certified & Experienced Dentist</h1>
                        <a href="appointment.html" class="btn btn-primary py-3 px-5">Appointment</a>
                    </div>
                </div>
                <div class="col-lg-4 wow slideInUp" data-wow-delay="0.3s">
                    <div class="team-item">
                        <div class="position-relative rounded-top" style={{ zIndex: 1 }}>
                            <img class="img-fluid rounded-top w-100" src="img/team-1.jpg" alt="" />
                            <div class="position-absolute top-100 start-50 translate-middle bg-light rounded p-2 d-flex">
                                <a class="btn btn-primary btn-square m-1" href="https://twitter.com"><i class="fab fa-twitter fw-normal"></i></a>
                                <a class="btn btn-primary btn-square m-1" href="https://facebook.com"><i class="fab fa-facebook-f fw-normal"></i></a>
                                <a class="btn btn-primary btn-square m-1" href="https://linkedin.com"><i class="fab fa-linkedin-in fw-normal"></i></a>
                                <a class="btn btn-primary btn-square m-1" href="https://instagram.com"><i class="fab fa-instagram fw-normal"></i></a>
                            </div>
                        </div>
                        <div class="team-text position-relative bg-light text-center rounded-bottom p-4 pt-5">
                            <h4 class="mb-2">Dr. John Doe</h4>
                            <p class="text-primary mb-0">Implant Surgeon</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 wow slideInUp" data-wow-delay="0.6s">
                    <div class="team-item">
                        <div class="position-relative rounded-top" style={{ zIndex: 1 }}>
                            <img class="img-fluid rounded-top w-100" src="img/team-2.jpg" alt="" />
                            <div class="position-absolute top-100 start-50 translate-middle bg-light rounded p-2 d-flex">
                                <a class="btn btn-primary btn-square m-1" href="https://twitter.com"><i class="fab fa-twitter fw-normal"></i></a>
                                <a class="btn btn-primary btn-square m-1" href="https://facebook.com"><i class="fab fa-facebook-f fw-normal"></i></a>
                                <a class="btn btn-primary btn-square m-1" href="https://linkedin.com"><i class="fab fa-linkedin-in fw-normal"></i></a>
                                <a class="btn btn-primary btn-square m-1" href="https://instagram.com"><i class="fab fa-instagram fw-normal"></i></a>
                            </div>
                        </div>
                        <div class="team-text position-relative bg-light text-center rounded-bottom p-4 pt-5">
                            <h4 class="mb-2">Dr. John Doe</h4>
                            <p class="text-primary mb-0">Implant Surgeon</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 wow slideInUp" data-wow-delay="0.1s">
                    <div class="team-item">
                        <div class="position-relative rounded-top" style={{ zIndex: 1 }}>
                            <img class="img-fluid rounded-top w-100" src="img/team-3.jpg" alt="" />
                            <div class="position-absolute top-100 start-50 translate-middle bg-light rounded p-2 d-flex">
                                <button class="btn btn-primary btn-square m-1"><i class="fab fa-twitter fw-normal"></i></button>
                                <button class="btn btn-primary btn-square m-1"><i class="fab fa-facebook-f fw-normal"></i></button>
                                <button class="btn btn-primary btn-square m-1"><i class="fab fa-linkedin-in fw-normal"></i></button>
                                <button class="btn btn-primary btn-square m-1"><i class="fab fa-instagram fw-normal"></i></button>
                            </div>
                        </div>
                        <div class="team-text position-relative bg-light text-center rounded-bottom p-4 pt-5">
                            <h4 class="mb-2">Dr. John Doe</h4>
                            <p class="text-primary mb-0">Implant Surgeon</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 wow slideInUp" data-wow-delay="0.3s">
                    <div class="team-item">
                        <div class="position-relative rounded-top" style={{ zIndex: 1 }}>
                            <img class="img-fluid rounded-top w-100" src="img/team-4.jpg" alt="" />
                            <div class="position-absolute top-100 start-50 translate-middle bg-light rounded p-2 d-flex">
                                <button class="btn btn-primary btn-square m-1"><i class="fab fa-twitter fw-normal"></i></button>
                                <button class="btn btn-primary btn-square m-1"><i class="fab fa-facebook-f fw-normal"></i></button>
                                <button class="btn btn-primary btn-square m-1"><i class="fab fa-linkedin-in fw-normal"></i></button>
                                <button class="btn btn-primary btn-square m-1"><i class="fab fa-instagram fw-normal"></i></button>
                            </div>
                        </div>
                        <div class="team-text position-relative bg-light text-center rounded-bottom p-4 pt-5">
                            <h4 class="mb-2">Dr. John Doe</h4>
                            <p class="text-primary mb-0">Implant Surgeon</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 wow slideInUp" data-wow-delay="0.6s">
                    <div class="team-item">
                        <div class="position-relative rounded-top" style={{ zIndex: 1 }}>
                            <img class="img-fluid rounded-top w-100" src="img/team-5.jpg" alt="" />
                            <div class="position-absolute top-100 start-50 translate-middle bg-light rounded p-2 d-flex">
                                <button class="btn btn-primary btn-square m-1"><i class="fab fa-twitter fw-normal"></i></button>
                                <button class="btn btn-primary btn-square m-1"><i class="fab fa-facebook-f fw-normal"></i></button>
                                <button class="btn btn-primary btn-square m-1"><i class="fab fa-linkedin-in fw-normal"></i></button>
                                <button class="btn btn-primary btn-square m-1"><i class="fab fa-instagram fw-normal"></i></button>
                            </div>
                        </div>
                        <div class="team-text position-relative bg-light text-center rounded-bottom p-4 pt-5">
                            <h4 class="mb-2">Dr. John Doe</h4>
                            <p class="text-primary mb-0">Implant Surgeon</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* Team End */}
    

    {/* Newsletter Start */}
    <div class="container-fluid position-relative pt-5 wow fadeInUp" data-wow-delay="0.1s" style={{ zIndex: 1 }}>
        <div class="container">
            <div class="bg-primary p-5">
                <form class="mx-auto" style={{ maxWidth: '600px' }}>
                    <div class="input-group">
                        <input type="text" class="form-control border-white p-3" placeholder="Your Email" />
                        <button class="btn btn-dark px-4">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    </div>


        </div>
    </div>
  );
};

export default Team;