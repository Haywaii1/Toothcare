import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const services = [
  {
    title: "Cosmetic Dentistry",
    slug: "cosmetic-dentistry",
    image: "image/surgery.jpg",
    description:
      "Enhance your smile with aesthetic treatments such as veneers, bonding, and reshaping. Our cosmetic dentistry services focus on both form and function to give you the confidence you deserve.",
  },
  {
    title: "Dental Implants",
    slug: "dental-implants",
    image: "image/surgery2.jpg",
    description:
      "Dental implants are a permanent solution for missing teeth. They look, feel, and function like natural teeth, restoring your smile and confidence with long-lasting results.",
  },
  {
    title: "Dental Bridges",
    slug: "dental-bridges",
    image: "image/dental-surgery.jpg",
    description:
      "A dental bridge is used to fill the gap created by one or more missing teeth. It restores both the aesthetics and functionality of your bite.",
  },
  {
    title: "Teeth Whitening",
    slug: "teeth-whitening",
    image: "image/teeth-whitening.jpg",
    description:
      "Brighten your smile with our safe and effective teeth whitening treatments. Perfect for removing stains and discoloration caused by coffee, wine, smoking, and aging.",
  },
];

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    window.scrollTo(0, 0);
  }, []);

  if (!service) {
    return (
      <div className="container mt-5 text-center">
        <h2>Service Not Found</h2>
        <p>The service you're looking for doesn't exist.</p>
        <Link to="/services" className="btn btn-primary mt-3">Back to Services</Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{service.title} | Your Dental Clinic</title>
        <meta name="description" content={service.description.slice(0, 160)} />
        <meta property="og:title" content={service.title} />
        <meta property="og:description" content={service.description} />
        <meta property="og:image" content={`/${service.image}`} />
        <meta property="og:url" content={`https://yourwebsite.com/services/${service.slug}`} />
      </Helmet>

      <motion.div
        className="container mt-5"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-4" data-aos="fade-up">
          <h1>{service.title}</h1>
        </div>

        <div className="row align-items-center mb-5" data-aos="fade-up">
  <div className="col-md-6 mb-4 mb-md-0">
    <img
      src={`/${service.image}`}
      alt={service.title}
      className="img-fluid rounded shadow"
      style={{ maxHeight: "400px", objectFit: "cover", width: "100%" }}
    />
  </div>
  <div className="col-md-6">
    <p className="lead">{service.description}</p>
  </div>
</div>


        <div className="mt-4 text-end">
          <Link to="/services" className="btn btn-outline-primary">
            ← Back to Services
          </Link>
        </div>
      </motion.div>
    </>
  );
};

export default ServiceDetail;
