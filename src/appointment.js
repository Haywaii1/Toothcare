import React from "react";
import Navbar from "./Navbar";


const Appointment = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div className="container-fluid bg-light ps-5 pe-0 d-none d-lg-block">
          <div className="row gx-0">
            <div className="col-md-6 text-center text-lg-start mb-2 mb-lg-0">
              <div className="d-inline-flex align-items-center">
                <small className="py-2">
                  <i className="far fa-clock text-primary me-2"></i>Opening Hours: Mon - Tues : 6.00 am - 10.00 pm, Sunday Closed{" "}
                </small>
              </div>
            </div>
            <div className="col-md-6 text-center text-lg-end">
              <div className="position-relative d-inline-flex align-items-center bg-primary text-white top-shape px-5">
                <div className="me-3 pe-3 border-end py-2">
                  <p className="m-0">
                    <i className="fa fa-envelope-open me-2"></i>info@example.com
                  </p>
                </div>
                <div className="py-2">
                  <p className="m-0">
                    <i className="fa fa-phone-alt me-2"></i>+012 345 6789
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        

        {/* Full Screen Search Start */}
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
                <div className="input-group" style={{ maxWidth: "600px" }}>
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
        {/* Full Screen Search End */}

        {/* Hero Start */}
        <div className="container-fluid bg-primary py-5 hero-header mb-5">
          <div className="row py-3">
            <div className="col-12 text-center">
              <h1 className="display-3 text-white animated zoomIn">Testimonial</h1>
              <a href="/" className="h4 text-white">Home</a>
              <i className="far fa-circle text-white px-2"></i>
              <button className="h4 text-white btn btn-link">Testimonial</button>
              <i className="far fa-circle text-white px-2"></i>
              <a href="/testimonial" className="h4 text-white">Testimonial</a>
            </div>
          </div>
        </div>
        {/* Hero End */}

        {/* Testimonial Start */}
        <div
          className="container-fluid bg-primary bg-testimonial py-5 mb-5 wow fadeInUp"
          data-wow-delay="0.1s"
          style={{ marginTop: "90px" }}
        >
          <div className="container py-5">
            <div className="row justify-content-center">
              <div className="col-lg-7">
                <div
                  className="owl-carousel testimonial-carousel rounded p-5 wow zoomIn"
                  data-wow-delay="0.6s"
                >
                  <div className="testimonial-item text-center text-white">
                    <img
                      className="img-fluid mx-auto rounded mb-4"
                      src="img/testimonial-1.jpg"
                      alt=""
                    />
                    <p className="fs-5">
                      Dolores sed duo clita justo dolor et stet lorem kasd dolore
                      lorem ipsum. At lorem lorem magna ut et, nonumy labore diam
                      erat. Erat dolor rebum sit ipsum.
                    </p>
                    <hr className="mx-auto w-25" />
                    <h4 className="text-white mb-0">Client Name</h4>
                  </div>
                  <div className="testimonial-item text-center text-white">
                    <img
                      className="img-fluid mx-auto rounded mb-4"
                      src="img/testimonial-2.jpg"
                      alt=""
                    />
                    <p className="fs-5">
                      Dolores sed duo clita justo dolor et stet lorem kasd dolore
                      lorem ipsum. At lorem lorem magna ut et, nonumy labore diam
                      erat. Erat dolor rebum sit ipsum.
                    </p>
                    <hr className="mx-auto w-25" />
                    <h4 className="text-white mb-0">Client Name</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Testimonial End */}

        {/* Newsletter Start */}
        <div
          className="container-fluid position-relative pt-5 wow fadeInUp"
          data-wow-delay="0.1s"
          style={{ zIndex: 1 }}
        >
          <div className="container">
            <div className="bg-primary p-5">
              <form className="mx-auto" style={{ maxWidth: "600px" }}>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control border-white p-3"
                    placeholder="Your Email"
                  />
                  <button className="btn btn-dark px-4">Sign Up</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Newsletter End */}
      </div>
    </div>
  );
};

export default Appointment;