import React, { useEffect, useState } from "react";
import studentData from "../api/StudentsData.json";
import StudentCard from "../components/Layout/StudentCard";
import "./UI_Pages/students.css";

const Students = () => {
  const [searchValue, setSearchValue] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const uniqueCourses = [
      ...new Set(studentData.map((student) => student.course)),
    ];
    setCourses(uniqueCourses);
  }, []);
  const filteredStudents = studentData
    .filter((student) => {
      return (
        (!selectedCourse || student.course === selectedCourse) &&
        student.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    })
    .sort((a, b) => {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
  return (
    <div className="student-container">
      <header className="student-container-header">
        <img
          src="https://imgs.search.brave.com/rw0BtzCH0g5Naup9F_Tt_3yVuG83Zv9KlA9IJh6Ln84/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9zY2hv/b2wtbG9nby1vcGVu/LWJvb2stc3R1ZGVu/dC1zaWxob3VldHRl/LWtub3dsZWRnZS1l/ZHVjYXRpb24tc3lt/Ym9sLXVuaXZlcnNp/dHktbGlicmFyeS1i/b29rc3RvcmUtbG9n/b3R5cGUtdGVtcGxh/dGUtdmVjdG9yLTIx/Mzk0NjE5MS5qcGc"
          alt="college-Logo"
          className="logo"
        />
        <input
          type="text"
          placeholder="Search Student..."
          className="search-input"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </header>
      <div className="student-body-container">
        <aside className="courses-side">
          <ul>
            <li>
              <label>
                <input
                  type="radio"
                  name="course"
                  checked={selectedCourse === null}
                  onChange={() => setSelectedCourse(null)}
                />
                All
              </label>
            </li>
            {courses &&
              courses.map((course) => {
                return (
                  <li key={course}>
                    <label>
                      <input
                        type="radio"
                        name="course"
                        onChange={() => setSelectedCourse(course)}
                      />
                      {course}
                    </label>
                  </li>
                );
              })}
          </ul>
          <div className="sorting-box">
            <button
              className={sortOrder === "asc" ? "active" : ""}
              onClick={() => setSortOrder("asc")}
            >
              A → Z
            </button>
            <button
              className={sortOrder === "desc" ? "active" : ""}
              onClick={() => setSortOrder("desc")}
            >
              Z → A
            </button>
          </div>
        </aside>
        <main className="students-card-side">
          {filteredStudents.map((student, index) => {
            return <StudentCard key={index} student={student} />;
          })}
        </main>
      </div>
    </div>
  );
};

export default Students;
