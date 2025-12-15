import React from "react";
import { useParams } from "react-router-dom";
import teacherData from "../../api/teachersData.json";
import "./LayoutStyle/teacherDetails.css"

const TeacherDetails = () => {
  const { id } = useParams();
  const teacher = teacherData.find((t) => t.id === id);
  return (
    <div className="teacher-details-page">
      <img src={teacher.teacher_image} alt={teacher.name} className="big-img" />

      <div className="details-info">
        <h2>{teacher.name}</h2>
        <p>
          <strong>Position:</strong> {teacher.position}
        </p>
        <p>
          <strong>Course:</strong> {teacher.course}
        </p>
        <p>
          <strong>Email:</strong> {teacher.email}
        </p>
        <p>
          <strong>Contact:</strong> {teacher.contact}
        </p>
        <p>
          <strong>Qualification:</strong> {teacher.qualification}
        </p>
        <p>
          <strong>Room No:</strong> {teacher.room_number}
        </p>
        <p>
          <strong>Address:</strong> {teacher.address}
        </p>

        <p className="details">{teacher.brief_bio}</p>
      </div>
    </div>
  );
};

export default TeacherDetails;
