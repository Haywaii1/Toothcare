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
  const [buttonClicked, setButtonClicked] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
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
    setButtonClicked(true);

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
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true,
        }
      );

      setSuccessMessage("Appointment booked successfully!");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error:", error.response?.data);
      setErrorMessage(error.response?.data?.message || "Failed to book appointment.");
      setButtonClicked(false); // Allow retry
    }
  };

  // 👇 Protect the route: Only show form if logged in
  if (!authToken) {
    return (
      <div className="container mt-5 text-center">
        <h3>Please log in to book an appointment.</h3>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/login")}>
          Go to Login
        </button>
      </div>
    );
  }

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

        <button
          type="submit"
          className={`btn btn-primary w-100 ${buttonClicked ? "opacity-50" : ""}`}
          disabled={buttonClicked}
        >
          {buttonClicked ? "Booking..." : "Book Appointment"}
        </button>
      </form>
    </div>
  );
};

export default Appointment;
