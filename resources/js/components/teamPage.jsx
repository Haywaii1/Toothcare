import React, { useEffect, useState } from "react";
import Team from "./team";

const TeamPage = () => {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        fetch("/api/team") // Your backend API endpoint
            .then((res) => res.json())
            .then((data) => setMembers(data))
            .catch((err) => console.error("Error fetching team members:", err));
    }, []);

    return (
        <div className="container py-5">
            {/* Header Section */}
            <div className="row mb-5">
                <div className="col-lg-6 mx-auto text-center">
                    <div className="section-title bg-light rounded p-4 shadow-sm">

                        <h1 className="display-6 mb-3">
                            Meet Our Certified & Experienced Dentist
                        </h1>
                        <a href="/appointments" className="btn btn-primary py-2 px-4">
                            Book Appointment
                        </a>
                    </div>
                </div>
            </div>

            {/* Team Cards Grid */}
            <div className="row g-4">
                {members.map((member, index) => (
                    <div className="col-md-6 col-lg-4" key={index}>
                        <Team teamMember={member} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeamPage;
