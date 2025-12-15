import React from "react";
import "./UIstyles/MainFaculty.css";
import MainFacultyData from "../../api/mainFacultyData.json";
import { Link } from "react-router-dom";

const MainFaculty = () => {
  return (
    <section className="main-faculty-section">
      <h2 className="section-title">OUR MAIN REPRESENTATIVE</h2>
      <div className="container">
        {MainFacultyData.map((mainFaculty) => {
          return (
            <div className="faculty-card" key={mainFaculty.id}>
              <img src={mainFaculty.photo} alt={mainFaculty.name} />
              <h3>{mainFaculty.name}</h3>
              <p className="position">{mainFaculty.position}</p>
              <Link to={`/mainFaculty/${mainFaculty.id}`} className="read-more">
                Read More
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MainFaculty;
