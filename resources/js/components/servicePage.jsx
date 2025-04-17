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
                        <h1 className="display-3 text-white animated zoomIn">
                            Services
                        </h1>
                    </div>
                </div>
            </div>

            {/* Intro Text */}
            <div className="container">
                <div className="row py-5">
                    <div className="col-12 text-center">
                        <div className="fs-4 text-black mb-4 animated zoomIn">
                            Dental services play a vital role in maintaining oral health and overall well-being.
                            From routine checkups to advanced treatments, modern dentistry offers a wide range
                            of services to keep your teeth and gums in top condition. Preventive care is the
                            foundation of dental health. Regular cleanings, exams, and X-rays help detect issues
                            early and prevent complications. Dentists also offer fluoride treatments and sealants
                            to protect against cavities, especially in children.

                            For those needing restoration, fillings, crowns, and bridges repair damaged or missing
                            teeth. Root canal therapy can save severely infected teeth, while dental implants and
                            dentures restore smiles and functionality. Cosmetic services like teeth whitening,
                            veneers, and invisible braces (such as Invisalign) enhance appearance and boost confidence.

                            Whether you're looking to improve your smile or address pain and discomfort, dental
                            professionals are equipped to help. Prioritizing dental visits and practicing good oral
                            hygiene at home ensures a lifetime of healthy smiles.
                        </div>
                    </div>
                </div>
            </div>

            {/* Services Grid */}
            <div className="container py-5">
                <div className="row g-4">
                    {services.map((service, index) => (
                        <div
                            className="col-md-6 col-lg-3"
                            key={service.slug}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <Link
                                to={`/services/${service.slug}`}
                                className="text-decoration-none"
                            >
                                <div className="card shadow-sm h-100">
                                    <img
                                        src={service.image}
                                        className="card-img-top"
                                        alt={service.title}
                                        style={{
                                            height: "200px",
                                            objectFit: "cover",
                                        }}
                                    />
                                    <div className="card-body text-center">
                                        <h5 className="card-title">
                                            {service.title}
                                        </h5>
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
