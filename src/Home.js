import React from "react";
import Navbar from "./Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'animate.css/animate.min.css';
import 'jquery/dist/jquery.min.js';
import "owl.carousel/dist/assets/owl.carousel.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./style.css"; 

  

const Home = () => {
   
  return (
    <>
      <Navbar />

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


      <div>
        <div className="modal fade" id="searchModal" tabIndex="-1">
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content" style={{ background: 'rgba(9, 30, 62, .7)' }}>
              <div className="modal-header border-0">
                <button type="button" className="btn bg-white btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body d-flex align-items-center justify-content-center">
                <div className="input-group" style={{ maxWidth: '600px' }}>
                  <input type="text" className="form-control bg-transparent border-primary p-3" placeholder="Type search keyword" />
                  <button className="btn btn-primary px-4"><i className="bi bi-search"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Start */}
        <div className="container-fluid p-0">
          <div id="header-carousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img className="w-100" src="image/doctors.jpg" alt="Dental Treatment" style={{ maxWidth: 'auto', height: 'auto' }} />
                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                  <div className="p-3" style={{ maxWidth: '900px' }}>
                    <h5 className="text-white text-uppercase mb-3 animated slideInDown">Keep Your Teeth Healthy</h5>
                    <h1 className="display-1 text-white mb-md-4 animated zoomIn">Take The Best Quality Dental Treatment</h1>
                    <a href="appointment.html" className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft">Appointment</a>
                    <button className="btn btn-secondary py-md-3 px-md-5 animated slideInRight">Contact Us</button>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <img className="w-100" src="image/dentists.jpg" alt="Dental Treatment" />
                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                  <div className="p-3" style={{ maxWidth: '900px' }}>
                    <h5 className="text-white text-uppercase mb-3 animated slideInDown">Keep Your Teeth Healthy</h5>
                    <h1 className="display-1 text-white mb-md-4 animated zoomIn">Take The Best Quality Dental Treatment</h1>
                    <a href="appointment.html" className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft">Appointment</a>
                    <button className="btn btn-secondary py-md-3 px-md-5 animated slideInRight">Contact Us</button>
                  </div>
                </div>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#header-carousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#header-carousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        <div className="container-fluid banner mb-5">
        <div className="container">
            <div className="row gx-0">
                <div className="col-lg-4 wow zoomIn" data-wow-delay="0.1s">
                    <div className="bg-primary d-flex flex-column p-5" style={{ height: '300px' }}>
                        <h3 className="text-white mb-3">Opening Hours</h3>
                        <div className="d-flex justify-content-between text-white mb-3">
                            <h6 className="text-white mb-0">Mon - Fri</h6>
                            <p className="mb-0"> 8:00am - 9:00pm</p>
                        </div>
                        <div className="d-flex justify-content-between text-white mb-3">
                            <h6 className="text-white mb-0">Saturday</h6>
                            <p className="mb-0"> 8:00am - 7:00pm</p>
                        </div>
                        <div className="d-flex justify-content-between text-white mb-3">
                            <h6 className="text-white mb-0">Sunday</h6>
                            <p className="mb-0"> 8:00am - 5:00pm</p>
                        </div>
                        <button className="btn btn-light">Appointment</button>
                    </div>
                </div>
                <div className="col-lg-4 wow zoomIn" data-wow-delay="0.3s">
                    <div className="bg-dark d-flex flex-column p-5" style={{ height: '300px' }}>
                        <h3 className="text-white mb-3">Search A Doctor</h3>
                        <div className="date mb-3" id="date" data-target-input="nearest">
                            <input type="text" className="form-control bg-light border-0 datetimepicker-input"
                                placeholder="Appointment Date" data-target="#date" data-toggle="datetimepicker" style={{ height: '40px' }} />
                        </div>
                        <select className="form-select bg-light border-0 mb-3" style={{ height: '40px' }}>
                            <option selected>Select A Service</option>
                            <option value="1">Service 1</option>
                            <option value="2">Service 2</option>
                            <option value="3">Service 3</option>
                        </select>
                        <button className="btn btn-light">Search Doctor</button>
                    </div>
                </div>
                <div className="col-lg-4 wow zoomIn" data-wow-delay="0.6s">
                    <div className="bg-secondary d-flex flex-column p-5" style={{ height: '300px' }}>
                        <h3 className="text-white mb-3">Make Appointment</h3>
                        <p className="text-white">Ipsum erat ipsum dolor clita rebum no rebum dolores labore, ipsum magna at eos et eos amet.</p>
                        <h2 className="text-white mb-0">+012 345 6789</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div class="container">
            <div class="row g-5">
                <div class="col-lg-7">
                    <div class="section-title mb-4">
                        <h5 class="position-relative d-inline-block text-primary text-uppercase">About Us</h5>
                        <h1 class="display-5 mb-0">The World's Best Dental Clinic That You Can Trust</h1>
                    </div>
                    <h4 class="text-body fst-italic mb-4">Diam dolor diam ipsum sit. Clita erat ipsum et lorem stet no lorem sit clita duo justo magna dolore</h4>
                    <p class="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum et tempor sit. Aliqu diam amet diam et eos labore. Clita erat ipsum et lorem et sit, sed stet no labore lorem sit. Sanctus clita duo justo et tempor eirmod magna dolore erat amet</p>
                    <div class="row g-3">
                        <div class="col-sm-6 wow zoomIn" data-wow-delay="0.3s">
                            <h5 class="mb-3"><i class="fa fa-check-circle text-primary me-3"></i>Award Winning</h5>
                            <h5 class="mb-3"><i class="fa fa-check-circle text-primary me-3"></i>Professional Staff</h5>
                        </div>
                        <div class="col-sm-6 wow zoomIn" data-wow-delay="0.6s">
                            <h5 class="mb-3"><i class="fa fa-check-circle text-primary me-3"></i>24/7 Opened</h5>
                            <h5 class="mb-3"><i class="fa fa-check-circle text-primary me-3"></i>Fair Prices</h5>
                        </div>
                    </div>
                    <a href="appointment.html" class="btn btn-primary py-3 px-5 mt-4 wow zoomIn" data-wow-delay="0.6s">Make Appointment</a>
                </div>
                <div className="col-lg-5" style={{ minHeight: '500px' }}>
                    <div class="position-relative h-100">
                        <img className="position-absolute w-100 h-100 rounded wow zoomIn" data-wow-delay="0.9s" src="image/dentist2.jpg" style={{ objectFit: 'cover' }} alt="About Us" />
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container-fluid bg-primary bg-appointment my-5 wow fadeInUp" data-wow-delay="0.1s">
        <div class="container">
            <div class="row gx-5">
                <div class="col-lg-6 py-5">
                    <div class="py-5">
                        <h1 class="display-5 text-white mb-4">We Are A Certified and Award Winning Dental Clinic You Can Trust</h1>
                        <p class="text-white mb-0">Eirmod sed tempor lorem ut dolores. Aliquyam sit sadipscing kasd ipsum. Dolor ea et dolore et at sea ea at dolor, justo ipsum duo rebum sea invidunt voluptua. Eos vero eos vero ea et dolore eirmod et. Dolores diam duo invidunt lorem. Elitr ut dolores magna sit. Sea dolore sanctus sed et. Takimata takimata sanctus sed.</p>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="appointment-form h-100 d-flex flex-column justify-content-center text-center p-5 wow zoomIn" data-wow-delay="0.6s">
                        <h1 class="text-white mb-4">Make Appointment</h1>
                        <form>
                            <div class="row g-3">
                                <div class="col-12 col-sm-6">
                                    <select className="form-select bg-light border-0" style={{ height: '55px' }}>
                                        <option selected>Select A Service</option>
                                        <option value="1">Service 1</option>
                                        <option value="2">Service 2</option>
                                        <option value="3">Service 3</option>
                                    </select>
                                </div>
                                <div class="col-12 col-sm-6">
                                    <select className="form-select bg-light border-0" style={{ height: '55px' }}>
                                        <option selected>Select Doctor</option>
                                        <option value="1">Doctor 1</option>
                                        <option value="2">Doctor 2</option>
                                        <option value="3">Doctor 3</option>
                                    </select>
                                </div>
                                <div class="col-12 col-sm-6">
                                    <input type="text" className="form-control bg-light border-0" placeholder="Your Name" style={{ height: '55px' }} />
                                </div>
                                <div class="col-12 col-sm-6">
                                    <input type="email" className="form-control bg-light border-0" placeholder="Your Email" style={{ height: '55px' }} />
                                </div>
                                <div class="col-12 col-sm-6">
                                    <div class="date" id="date1" data-target-input="nearest">
                                        <input type="text"
                                            class="form-control bg-light border-0 datetimepicker-input"
                                            placeholder="Appointment Date" data-target="#date1" data-toggle="datetimepicker" style={{ height: '55px' }} />
                                    </div>
                                </div>
                                <div class="col-12 col-sm-6">
                                    <div class="time" id="time1" data-target-input="nearest">
                                        <input type="text"
                                            class="form-control bg-light border-0 datetimepicker-input"
                                            placeholder="Appointment Time" data-target="#time1" data-toggle="datetimepicker" style={{ height: '55px' }} />
                                    </div>
                                </div>
                                <div class="col-12">
                                    <button class="btn btn-dark w-100 py-3" type="submit">Make Appointment</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div class="container">
            <div class="row g-5 mb-5">
                <div className="col-lg-5 wow zoomIn" data-wow-delay="0.3s" style={{ minHeight: '400px' }}>
                    <div class="twentytwenty-container position-relative h-100 rounded overflow-hidden">
                        <img className="position-absolute w-100 h-100" src="image/patient.jpg" style={{ objectFit: 'cover' }} alt="Before" />
                        <img className="position-absolute w-100 h-100" src="image/patient.jpg" style={{ objectFit: 'cover' }} alt="After" />
                    </div>
                </div>
                <div class="col-lg-7">
                    <div class="section-title mb-5">
                        <h5 class="position-relative d-inline-block text-primary text-uppercase">Our Services</h5>
                        <h1 class="display-5 mb-0">We Offer The Best Quality Dental Services</h1>
                    </div>
                    <div class="row g-5">
                        <div class="col-md-6 service-item wow zoomIn" data-wow-delay="0.6s">
                            <div class="rounded-top overflow-hidden">
                                <img class="img-fluid" src="image/surgery.jpg" alt="" />
                            </div>
                            <div class="position-relative bg-light rounded-bottom text-center p-4">
                                <h5 class="m-0">Cosmetic Dentistry</h5>
                            </div>
                        </div>
                        <div class="col-md-6 service-item wow zoomIn" data-wow-delay="0.9s">
                            <div class="rounded-top overflow-hidden">
                                <img class="img-fluid" src="image/surgery2.jpg" alt="" />
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
                        <div class="col-md-6 service-item wow zoomIn" data-wow-delay="0.3s">
                            <div class="rounded-top overflow-hidden">
                                <img class="img-fluid" src="image/dental-surgery.jpg" alt="" />
                            </div>
                            <div class="position-relative bg-light rounded-bottom text-center p-4">
                                <h5 class="m-0">Dental Bridges</h5>
                            </div>
                        </div>
                        <div class="col-md-6 service-item wow zoomIn" data-wow-delay="0.6s">
                            <div class="rounded-top overflow-hidden">
                                <img class="img-fluid" src="image/teeth-whitening.jpg" alt="" />
                            </div>
                            <div class="position-relative bg-light rounded-bottom text-center p-4">
                                <h5 class="m-0">Teeth Whitening</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-5 service-item wow zoomIn" data-wow-delay="0.9s">
                    <div class="position-relative bg-primary rounded h-100 d-flex flex-column align-items-center justify-content-center text-center p-4">
                        <h3 class="text-white mb-3">Make Appointment</h3>
                        <p class="text-white mb-3">Clita ipsum magna kasd rebum at ipsum amet dolor justo dolor est magna stet eirmod</p>
                        <h2 class="text-white mb-0">+012 345 6789</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="container-fluid bg-offer my-5 py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div class="container py-5">
            <div class="row justify-content-center">
                <div class="col-lg-7 wow zoomIn" data-wow-delay="0.6s">
                    <div class="offer-text text-center rounded p-5">
                        <h1 class="display-5 text-white">Save 30% On Your First Dental Checkup</h1>
                        <p class="text-white mb-4">Eirmod sed tempor lorem ut dolores sit kasd ipsum. Dolor ea et dolore et at sea ea at dolor justo ipsum duo rebum sea. Eos vero eos vero ea et dolore eirmod diam duo lorem magna sit dolore sed et.</p>
                        <a href="appointment.html" class="btn btn-dark py-3 px-5 me-3">Appointment</a>
                        <button className="btn btn-light py-3 px-5">Read More</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div class="container">
            <div class="row g-5">
                <div class="col-lg-5">
                    <div class="section-title mb-4">
                        <h5 class="position-relative d-inline-block text-primary text-uppercase">Pricing Plan</h5>
                        <h1 class="display-5 mb-0">We Offer Fair Prices for Dental Treatment</h1>
                    </div>
                    <p class="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum et tempor sit. Aliqu diam amet diam et eos labore. Clita erat ipsum et lorem et sit, sed stet no labore lorem sit. Sanctus clita duo justo eirmod magna dolore erat amet</p>
                    <h5 class="text-uppercase text-primary wow fadeInUp" data-wow-delay="0.3s">Call for Appointment</h5>
                    <h1 class="wow fadeInUp" data-wow-delay="0.6s">+012 345 6789</h1>
                </div>
                <div class="col-lg-7">
                    <div class="owl-carousel price-carousel wow zoomIn" data-wow-delay="0.9s">
                        <div class="price-item pb-4">
                            <div class="position-relative">
                                <img class="img-fluid rounded-top" src="img/price-1.jpg" alt="" />
                                <div className="d-flex align-items-center justify-content-center bg-light rounded pt-2 px-3 position-absolute top-100 start-50 translate-middle" style={{ zIndex: 2 }}>
                                    <h2 class="text-primary m-0">$35</h2>
                                </div>
                            </div>
                            <div class="position-relative text-center bg-light border-bottom border-primary py-5 p-4">
                                <h4>Teeth Whitening</h4>
                                <hr class="text-primary w-50 mx-auto mt-0" />
                                <div class="d-flex justify-content-between mb-3"><span>Modern Equipment</span><i class="fa fa-check text-primary pt-1"></i></div>
                                <div class="d-flex justify-content-between mb-3"><span>Professional Dentist</span><i class="fa fa-check text-primary pt-1"></i></div>
                                <div class="d-flex justify-content-between mb-2"><span>24/7 Call Support</span><i class="fa fa-check text-primary pt-1"></i></div>
                                <a href="appointment.html" class="btn btn-primary py-2 px-4 position-absolute top-100 start-50 translate-middle">Appointment</a>
                            </div>
                        </div>
                        <div class="price-item pb-4">
                            <div class="position-relative">
                                <img class="img-fluid rounded-top" src="img/price-2.jpg" alt="" />
                                <div className="d-flex align-items-center justify-content-center bg-light rounded pt-2 px-3 position-absolute top-100 start-50 translate-middle" style={{ zIndex: 2 }}>
                                    <h2 class="text-primary m-0">$49</h2>
                                </div>
                            </div>
                            <div class="position-relative text-center bg-light border-bottom border-primary py-5 p-4">
                                <h4>Dental Implant</h4>
                                <hr class="text-primary w-50 mx-auto mt-0" />
                                <div class="d-flex justify-content-between mb-3"><span>Modern Equipment</span><i class="fa fa-check text-primary pt-1"></i></div>
                                <div class="d-flex justify-content-between mb-3"><span>Professional Dentist</span><i class="fa fa-check text-primary pt-1"></i></div>
                                <div class="d-flex justify-content-between mb-2"><span>24/7 Call Support</span><i class="fa fa-check text-primary pt-1"></i></div>
                                <a href="appointment.html" class="btn btn-primary py-2 px-4 position-absolute top-100 start-50 translate-middle">Appointment</a>
                            </div>
                        </div>
                        <div class="price-item pb-4">
                            <div class="position-relative">
                                <img class="img-fluid rounded-top" src="img/price-3.jpg" alt="" />
                                <div class="d-flex align-items-center justify-content-center bg-light rounded pt-2 px-3 position-absolute top-100 start-50 translate-middle" style={{ zIndex: 2 }}>
                                    <h2 class="text-primary m-0">$99</h2>
                                </div>
                            </div>
                            <div class="position-relative text-center bg-light border-bottom border-primary py-5 p-4">
                                <h4>Root Canal</h4>
                                <hr class="text-primary w-50 mx-auto mt-0" />
                                <div class="d-flex justify-content-between mb-3"><span>Modern Equipment</span><i class="fa fa-check text-primary pt-1"></i></div>
                                <div class="d-flex justify-content-between mb-3"><span>Professional Dentist</span><i class="fa fa-check text-primary pt-1"></i></div>
                                <div class="d-flex justify-content-between mb-2"><span>24/7 Call Support</span><i class="fa fa-check text-primary pt-1"></i></div>
                                <a href="appointment.html" class="btn btn-primary py-2 px-4 position-absolute top-100 start-50 translate-middle">Appointment</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container-fluid bg-primary bg-testimonial py-5 my-5 wow fadeInUp" data-wow-delay="0.1s">
        <div class="container py-5">
            <div class="row justify-content-center">
                <div class="col-lg-7">
                    <div class="owl-carousel testimonial-carousel rounded p-5 wow zoomIn" data-wow-delay="0.6s">
                        <div class="testimonial-item text-center text-white">
                            <img class="img-fluid mx-auto rounded mb-4" src="img/testimonial-1.jpg" alt="" />
                            <p class="fs-5">Dolores sed duo clita justo dolor et stet lorem kasd dolore lorem ipsum. At lorem lorem magna ut et, nonumy labore diam erat. Erat dolor rebum sit ipsum.</p>
                            <hr class="mx-auto w-25" />
                            <h4 class="text-white mb-0">Client Name</h4>
                        </div>
                        <div class="testimonial-item text-center text-white">
                            <img class="img-fluid mx-auto rounded mb-4" src="img/testimonial-2.jpg" alt="" />
                            <p class="fs-5">Dolores sed duo clita justo dolor et stet lorem kasd dolore lorem ipsum. At lorem lorem magna ut et, nonumy labore diam erat. Erat dolor rebum sit ipsum.</p>
                            <hr class="mx-auto w-25" />
                            <h4 class="text-white mb-0">Client Name</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

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
                        <div className="position-relative rounded-top" style={{ zIndex: 1 }}>
                            <img class="img-fluid rounded-top w-100" src="img/team-1.jpg" alt="" />
                            <div class="position-absolute top-100 start-50 translate-middle bg-light rounded p-2 d-flex">
                                <button className="btn btn-primary btn-square m-1"><i className="fab fa-twitter fw-normal"></i></button>
                                <button className="btn btn-primary btn-square m-1"><i className="fab fa-facebook-f fw-normal"></i></button>
                                <button className="btn btn-primary btn-square m-1"><i className="fab fa-linkedin-in fw-normal"></i></button>
                                <button className="btn btn-primary btn-square m-1"><i className="fab fa-instagram fw-normal"></i></button>
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
                        <div className="position-relative rounded-top" style={{ zIndex: 1 }}>
                            <img class="img-fluid rounded-top w-100" src="img/team-2.jpg" alt="" />
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
                            <img className="img-fluid rounded-top w-100" src="img/team-4.jpg" alt="" />
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

    <div className="container-fluid position-relative pt-5 wow fadeInUp" data-wow-delay="0.1s" style={{ zIndex: 1 }}>
        <div class="container">
            <div class="bg-primary p-5">
                <form className="mx-auto" style={{ maxWidth: '600px' }}>
                    <div class="input-group">
                        <input type="text" class="form-control border-white p-3" placeholder="Your Email" />
                        <button class="btn btn-dark px-4">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    

    <div className="container-fluid bg-dark text-light py-5 wow fadeInUp" data-wow-delay="0.3s" style={{ marginTop: '-75px' }}>
        <div class="container pt-5">
            <div class="row g-5 pt-4">
                <div class="col-lg-3 col-md-6">
                    <h3 class="text-white mb-4">Quick Links</h3>
                    <div class="d-flex flex-column justify-content-start">
                        <button className="text-light mb-2"><i className="bi bi-arrow-right text-primary me-2"></i>Home</button>
                        <button className="text-light mb-2"><i className="bi bi-arrow-right text-primary me-2"></i>About Us</button>
                        <button className="text-light mb-2"><i className="bi bi-arrow-right text-primary me-2"></i>Our Services</button>
                        <button className="text-light mb-2"><i className="bi bi-arrow-right text-primary me-2"></i>Latest Blog</button>
                        <button className="text-light"><i className="bi bi-arrow-right text-primary me-2"></i>Contact Us</button>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <h3 class="text-white mb-4">Popular Links</h3>
                    <div class="d-flex flex-column justify-content-start">
                        <button className="text-light mb-2"><i className="bi bi-arrow-right text-primary me-2"></i>Home</button>
                        <button className="text-light mb-2"><i className="bi bi-arrow-right text-primary me-2"></i>About Us</button>
                        <button className="text-light mb-2"><i className="bi bi-arrow-right text-primary me-2"></i>Our Services</button>
                        <button className="text-light mb-2"><i class="bi bi-arrow-right text-primary me-2"></i>Latest Blog</button>
                        <button className="text-light"><i class="bi bi-arrow-right text-primary me-2"></i>Contact Us</button>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <h3 class="text-white mb-4">Get In Touch</h3>
                    <p class="mb-2"><i class="bi bi-geo-alt text-primary me-2"></i>123 Street, New York, USA</p>
                    <p class="mb-2"><i class="bi bi-envelope-open text-primary me-2"></i>info@example.com</p>
                    <p class="mb-0"><i class="bi bi-telephone text-primary me-2"></i>+012 345 67890</p>
                </div>
                <div class="col-lg-3 col-md-6">
                    <h3 class="text-white mb-4">Follow Us</h3>
                    <div class="d-flex">
                        <button className="btn btn-lg btn-primary btn-lg-square rounded me-2"><i className="fab fa-twitter fw-normal"></i></button>
                        <button className="btn btn-lg btn-primary btn-lg-square rounded me-2"><i className="fab fa-facebook-f fw-normal"></i></button>
                        <button className="btn btn-lg btn-primary btn-lg-square rounded me-2"><i className="fab fa-linkedin-in fw-normal"></i></button>
                        <button className="btn btn-lg btn-primary btn-lg-square rounded"><i className="fab fa-instagram fw-normal"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="container-fluid text-light py-4" style={{ background: '#051225' }}>
        <div class="container">
            <div class="row g-0">
                <div class="col-md-6 text-center text-md-start">
                    <p className="mb-md-0">&copy; <span className="text-white border-bottom">Your Site Name</span>. All Rights Reserved.</p>
                </div>
                <div class="col-md-6 text-center text-md-end">
                    <p class="mb-0">Designed by <a class="text-white border-bottom" href="https://htmlcodex.com">HTML Codex</a></p>
                </div>
            </div>
        </div>
    </div>

        {/* <a href="#" className="btn btn-lg btn-primary btn-lg-square rounded back-to-top"><i className="bi bi-arrow-up"></i></a> */}
      </div>
    </>
  );
};

export default Home;