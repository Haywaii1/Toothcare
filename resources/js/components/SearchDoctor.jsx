import React, { useState } from "react";
import axios from "axios";

const SearchDoctor = () => {
    const [formData, setFormData] = useState({
        date: "",
        service: "",
    });

    const [doctors, setDoctors] = useState([]);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setDoctors([]);

        try {
            const response = await axios.get("http://127.0.0.1:8000/api/doctors", {
                params: formData,
            });

            setDoctors(response.data);
        } catch (error) {
            setError("No available doctors found.");
        }
    };

    return (
        <div className="search-doctor-container">
            <h2>Search A Doctor</h2>
            <form onSubmit={handleSubmit}>
                <input type="date" name="date" onChange={handleChange} required />
                <select name="service" onChange={handleChange} required>
                    <option value="">Select A Service</option>
                    <option value="General Checkup">General Checkup</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="Cavity Clening">Cavity Filling</option>
                    <option value="Root Canal">Root Canal</option>
                    <option value="Extraction">Extraction</option>
                </select>
                <button type="submit">Search Doctor</button>
            </form>

            {error && <p className="text-danger">{error}</p>}

            <ul>
                {doctors.map((doctor) => (
                    <li key={doctor.id}>{doctor.name} - {doctor.service}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchDoctor;
