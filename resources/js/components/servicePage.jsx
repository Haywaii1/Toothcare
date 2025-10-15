import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "./Footer";

const services = [
  {
    title: "Cosmetic Dentistry",
    slug: "cosmetic-dentistry",
    image: "image/surgery.jpg",
  },
  {
    title: "Dental Implants",
    slug: "dental-implants",
    image: "image/surgery2.jpg",
  },
  {
    title: "Dental Bridges",
    slug: "dental-bridges",
    image: "image/dental-surgery.jpg",
  },
  {
    title: "Teeth Whitening",
    slug: "teeth-whitening",
    image: "image/teeth-whitening.jpg",
  },
];

const Services = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className="container-fluid bg-primary py-5 hero-header mb-5">
        <div className="row py-3">
          <div className="col-12 text-center">
            <h1 className="display-3 text-white animated zoomIn">Services</h1>
          </div>
        </div>
      </div>

      {/* Intro Text */}
      <div className="container mb-4">
        <div className="row justify-content-center">
          <div className="col-lg-10 text-center">
            <p className="lead text-muted animated fadeIn">
              Dental services play a vital role in maintaining oral health and overall well-being. From routine
              checkups to advanced treatments, modern dentistry offers a wide range of services to keep your teeth and
              gums in top condition. Preventive care is the foundation of dental health. Regular cleanings, exams, and
              X-rays help detect issues early and prevent complications. Dentists also offer fluoride treatments and
              sealants to protect against cavities, especially in children.
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container pb-5">
        <div className="row g-4">
          {services.map((service, index) => (
            <div
              key={service.slug}
              className="col-md-6 col-lg-3"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <Link to={`/services/${service.slug}`} className="text-decoration-none">
                <div className="card h-100 border-0 shadow-sm service-card">
                  <div className="overflow-hidden rounded-top">
                    <img
                      src={service.image}
                      className="card-img-top transition"
                      alt={service.title}
                      style={{ height: "200px", objectFit: "cover", transition: "transform 0.4s ease" }}
                    />
                  </div>
                  <div className="card-body text-center">
                    <h5 className="card-title text-primary">{service.title}</h5>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Services;
