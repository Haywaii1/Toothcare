import React from "react";

const Services = () => {
  return (
    <>


      {/* Topbar Start */}
      <div className="container-fluid bg-light ps-5 pe-0 d-none d-lg-block">
        <div className="row gx-0">
          <div className="col-md-6 text-center text-lg-start mb-2 mb-lg-0">
            <div className="d-inline-flex align-items-center">
              <small className="py-2">
                <i className="far fa-clock text-primary me-2"></i>Opening Hours:
                Mon - Tues : 6.00 am - 10.00 pm, Sunday Closed{" "}
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
      {/* Topbar End */}




      <div className="container-fluid bg-primary py-5 hero-header mb-5">
        <div className="row py-3">
          <div className="col-12 text-center">
            <h1 className="display-3 text-white animated zoomIn">Services</h1>
            <a href="/" className="h4 text-white">
              Home
            </a>
            <i className="far fa-circle text-white px-2"></i>
            <a href="/services" className="h4 text-white">
              Services
            </a>
          </div>
        </div>
      </div>
      

      {/* Service Section */}
      <div className="container-fluid py-5">
        <div className="container">
          <div className="row g-5 mb-5">
            <div className="col-lg-5" style={{ minHeight: "400px" }}>
              <div className="position-relative h-100 rounded overflow-hidden">
                <img className="position-absolute w-100 h-100" src="/img/before.jpg" alt="Before" style={{ objectFit: "cover" }} />
                <img className="position-absolute w-100 h-100" src="/img/after.jpg" alt="After" style={{ objectFit: "cover" }} />
              </div>
            </div>
            <div className="col-lg-7">
              <div className="section-title mb-5">
                <h5 className="position-relative d-inline-block text-primary text-uppercase">Our Services</h5>
                <h1 className="display-5 mb-0">We Offer The Best Quality Dental Services</h1>
              </div>
              <div className="row g-5">
                <div className="col-md-6">
                  <div className="service-item">
                    <div className="rounded-top overflow-hidden">
                      <img className="img-fluid" src="/img/service-1.jpg" alt="Cosmetic Dentistry" />
                    </div>
                    <div className="position-relative bg-light rounded-bottom text-center p-4">
                      <h5 className="m-0">Cosmetic Dentistry</h5>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="service-item">
                    <div className="rounded-top overflow-hidden">
                      <img className="img-fluid" src="/img/service-2.jpg" alt="Dental Implants" />
                    </div>
                    <div className="position-relative bg-light rounded-bottom text-center p-4">
                      <h5 className="m-0">Dental Implants</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* More services can be added similarly */}
        </div>
      </div>
      {/* Service Section End */}
    </>
  );
};

export default Services;








// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const ServicePage = () => {
//     const [selectedService, setSelectedService] = useState("General checkup");
//     const [doctors, setDoctors] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");
//     const navigate = useNavigate(); // For navigation

//     useEffect(() => {
//         if (!selectedService) return;

//         setLoading(true);
//         setError("");

//         axios
//             .get("http://127.0.0.1:8000/api/doctors-by-service", {
//                 params: { service: selectedService },
//             })
//             .then((response) => {
//                 setDoctors(response.data);
//             })
//             .catch((error) => {
//                 console.error("Error fetching doctors:", error);
//                 setError("Failed to load doctors.");
//             })
//             .finally(() => setLoading(false));
//     }, [selectedService]);

//     // Function to handle booking
//     const handleBookAppointment = (doctor) => {
//         navigate("/appointments", { state: { doctor, service: selectedService } });
//     };

//     return (
//         <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
//             {/* Service Selection */}
//             <div className="text-center">
//                 <h2 className="text-3xl font-bold text-gray-800 mb-4">Select a Service</h2>
//                 <select
//                     className="mb-6 p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     onChange={(e) => setSelectedService(e.target.value)}
//                     value={selectedService}
//                 >
//                     <option value="General checkup">General Checkup</option>
//                     <option value="Cleaning">Cleaning</option>
//                     <option value="Cavity filling">Cavity Filling</option>
//                     <option value="Extraction">Extraction</option>
//                     <option value="Root canal">Root Canal</option>
//                 </select>
//             </div>

//             {/* Available Doctors */}
//             {/* <h3 className="text-2xl font-semibold text-gray-700 mb-4">Available Doctors</h3> */}
//             {loading && <p className="text-gray-600">Loading...</p>}
//             {error && <p className="text-red-500">{error}</p>}

//             <div className="flex flex-wrap justify-center gap-6 w-full max-w-4xl">
//                 {doctors.length > 0 ? (
//                     doctors.map((doctor) => (
//                         <div
//                             key={doctor.id}
//                             className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 text-center w-72 flex flex-col items-center"
//                         >
//                             <h2 className="text-xl font-semibold text-gray-900">{doctor.name}</h2>
//                             <p className="text-gray-600">Availability: {doctor.availability}</p>
//                             <p className="text-gray-500">⭐ {doctor.rating} Rating</p>
//                             <button
//                                 className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
//                                 onClick={() => handleBookAppointment(doctor)}
//                             >
//                                 Book Appointment
//                             </button>
//                         </div>
//                     ))
//                 ) : (
//                     <p className="text-gray-500">No doctors available for this service.</p>
//                 )}
//             </div>

//             {/* Home Button */}
//             <button
//                 onClick={() => navigate("/")}
//                 className="mt-8 bg-green-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-700 transition"
//             >
//                 Home
//             </button>
//         </div>
//     );
// };

// export default ServicePage;
