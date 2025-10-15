import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/style.css";
import AOS from 'aos';
import 'aos/dist/aos.css';


const TeamPage = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/team")
      .then((res) => {
        setMembers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch team members", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
          AOS.init({
              duration: 1000, // duration of animation
              once: true      // only animate once
          });
      }, []);

  return (
    
    <div className="team-page container py-5">
      <h2 className="text-center mb-4">Meet Our Dental Experts</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="row" >
          {members.map((member) => (
            <div key={member.id} className="col-md-4 mb-4" data-aos="fade-up">
              <div className="card h-100 shadow-sm">
                {member.image && (
                  <img
                    src={`http://127.0.0.1:8000/${member.image}`}
                    alt={member.name}
                    className="card-img-top"
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body" >
                  <h5 className="card-title">{member.name}</h5>
                  <p className="card-text text-muted">{member.role}</p>
                  <p className="card-text"><strong>Specialty:</strong> {member.specialty}</p>
                  <p className="card-text"><strong>Experience:</strong> {member.experience} years</p>
                  <p className="card-text"><strong>Availability:</strong> {member.availability}</p>
                  <p className="card-text"><strong>Bio:</strong> {member.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamPage;
