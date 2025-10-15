import React, { useState, useEffect } from "react";
import axios from "axios";

const DoctorList = () => {
  const [selectedAilment, setSelectedAilment] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const ailments = ["Root Canal", "Flu", "Fever", "Diabetes"];

  useEffect(() => {
    fetchDoctors();
  }, [selectedAilment, page]);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/doctors-by-ailment", {
        params: {
          ailment: selectedAilment,
          page: page,
          per_page: 5, // You can change how many per page
        },
      });
      setDoctors(response.data.data);
      setLastPage(response.data.last_page);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < lastPage) setPage((prev) => prev + 1);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Find a Doctor by Ailment</h2>

      <select
        value={selectedAilment}
        onChange={(e) => {
          setSelectedAilment(e.target.value);
          setPage(1); // Reset to page 1 when changing ailment
        }}
        className="border p-2 mb-4 w-full"
      >
        <option value="">Select an Ailment</option>
        {ailments.map((ailment, index) => (
          <option key={index} value={ailment}>
            {ailment}
          </option>
        ))}
      </select>

      {loading && <p>Loading doctors...</p>}

      {!loading && doctors.length > 0 && (
        <ul className="mt-4">
          {doctors.map((doctor) => (
            <li key={doctor.id} className="border p-2 mb-2 rounded shadow">
              <p className="font-semibold">{doctor.name}</p>
              <p className="text-sm text-gray-600">{doctor.service}</p>
            </li>
          ))}
        </ul>
      )}

      {!loading && doctors.length === 0 && selectedAilment && (
        <p>No doctors found for {selectedAilment}</p>
      )}

      {/* Pagination */}
      {!loading && doctors.length > 0 && (
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm">
            Page {page} of {lastPage}
          </span>
          <button
            onClick={handleNext}
            disabled={page === lastPage}
            className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      <button
        onClick={() => window.location.href = "/"}
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Home
      </button>
    </div>
  );
};

export default DoctorList;
