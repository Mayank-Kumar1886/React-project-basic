import React from "react";
import "./LayoutStyle/studentCard.css";

const StudentCard = ({ student }) => {

  const {
    name,
    course,
    section,
    parents_name,
    admission_number,
    dob,
    email,
    contact,
    address,
    student_image,
  } = student;
  return (
    <section className="student-card">
      <img src={student_image} alt="student image" className="student-img" />
      <div className="student-details">
        <h3>{name}</h3>
        <p>
          <strong>Admission No:</strong> {admission_number}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Course:</strong> {course}
        </p>
        <p>
          <strong>Section:</strong> {section}
        </p>
        <p>
          <strong>Parent:</strong> {parents_name}
        </p>
        <p>
          <strong>DOB:</strong> {dob}
        </p>
        <p>
          <strong>Contact:</strong> {contact}
        </p>
        <p>
          <strong>Address:</strong> {address}
        </p>
      </div>
    </section>
  );
};

export default StudentCard;
