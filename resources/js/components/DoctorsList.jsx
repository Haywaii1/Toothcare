import React, { useState, useEffect } from "react";
import axios from "axios";

const DoctorList = () => {
  const [selectedAilment, setSelectedAilment] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const ailments = ["Root Canal", "Flu", "Fever", "Diabetes"]; // Example ailments

  useEffect(() => {
    if (selectedAilment) {
      fetchDoctors();
    }
  }, [selectedAilment]);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/doctors-by-ailment", {
        params: { ailment: selectedAilment },
      });
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Find a Doctor by Ailment</h2>

      <select
        value={selectedAilment}
        onChange={(e) => setSelectedAilment(e.target.value)}
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
            <li key={doctor.id} className="border p-2 mb-2">
              {doctor.name} - {doctor.specialization}
            </li>
          ))}
        </ul>
      )}

      {!loading && doctors.length === 0 && selectedAilment && <p>No doctors found for {selectedAilment}</p>}

      <button onClick={() => window.location.href = "/"} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Home
      </button>
    </div>
  );
};

export default DoctorList;
