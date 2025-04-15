import React from "react";

const Team = ({ teamMember }) => {
    return (
        <div className="card" style={{ maxWidth: "400px", margin: "1rem auto", boxShadow: "0 0 10px rgba(0,0,0,0.1)", borderRadius: "12px" }}>
            <div className="card-header" style={{ textAlign: "center", padding: "1rem" }}>
                <h2>{teamMember.name}</h2>
            </div>
            <div className="card-body" style={{ padding: "1rem" }}>
                <img
                    src={`http://localhost:8000/${teamMember.image}`}
                    alt={teamMember.name}
                    style={{
                        width: "100%",
                        height: "250px",
                        objectFit: "cover",
                        borderRadius: "12px",
                        marginBottom: "1rem"
                    }}
                />
                <p><strong>Role:</strong> {teamMember.role}</p>
                <p><strong>Experience:</strong> {teamMember.experience} years</p>
                <p><strong>Specialty:</strong> {teamMember.specialty}</p>
                <p><strong>Availability:</strong> {teamMember.availability}</p>
                <p><strong>Bio:</strong> {teamMember.bio}</p>
            </div>
        </div>

    );
};

export default Team;
