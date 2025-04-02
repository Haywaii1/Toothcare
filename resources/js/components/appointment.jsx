import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Appointment = () => {
  const [formData, setFormData] = useState({
    date: new Date(),
    time: "",
    ailment: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [authToken, setAuthToken] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    console.log("Retrieved Token:", token); // Check if token exists
    if (token) {
      setAuthToken(token);
    }
  }, []);


  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formatTime = (time) => {
    return `${time}:00`; // Convert HH:MM to HH:MM:SS
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Auth Token before request:", authToken); // Verify token before sending

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/appointments",
        {
          ...formData,
          date: formData.date.toISOString().split("T")[0],
          time: formatTime(formData.time),
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Ensure correct format
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true, // Needed for Sanctum authentication
        }
      );

      setSuccessMessage("Appointment booked successfully!");

      // Redirect to home page after 2 seconds
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error:", error.response?.data);
      setErrorMessage(error.response?.data?.message || "Failed to book appointment.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Book an Appointment</h2>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handleSubmit} className="shadow p-4 bg-light rounded">
        <div className="mb-3">
          <label className="form-label">Ailment</label>
          <select
            name="ailment"
            className="form-control"
            value={formData.ailment}
            onChange={handleChange}
            required
          >
            <option value="">Select an ailment</option>
            <option value="General checkup">General checkup</option>
            <option value="Cleaning">Cleaning</option>
            <option value="Cavity filling">Cavity filling</option>
            <option value="Root canal">Root canal</option>
            <option value="Extraction">Extraction</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Date</label>
          <DatePicker
            selected={formData.date}
            onChange={handleDateChange}
            className="form-control"
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Time</label>
          <input
            type="time"
            name="time"
            className="form-control"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Message</label>
          <textarea
            name="message"
            className="form-control"
            value={formData.message}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default Appointment;
