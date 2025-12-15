import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import data from "../../api/mainFacultyData.json";
import "./LayoutStyle/MainFacultyDetails.css";

const MainFacultyDetails = () => {
  const { id } = useParams();
  const faculty = data.find((item) => item.id === Number(id));

  const navigate = useNavigate();
  return (
    <div className="faculty-details-wrapper">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <div className="faculty-image-box">
        <img src={faculty.photo} alt={faculty.name} />
      </div>
      <div className="faculty-info-box">
        <p className="position">{faculty.position}</p>

        <p>
          <strong>Email:</strong> {faculty.email}
        </p>
        <p>
          <strong>Contact:</strong> {faculty.contact}
        </p>
        <p>
          <strong>Qualification:</strong> {faculty.qualification}
        </p>
        <p>
          <strong>Room No:</strong> {faculty.room_no}
        </p>

        <p className="details">{faculty.details}</p>
        <p></p>
      </div>
    </div>
  );
};

export default MainFacultyDetails;
