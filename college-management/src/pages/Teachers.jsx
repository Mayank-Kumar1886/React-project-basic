import React, { useEffect, useState } from "react";
import teacherData from "../api/teachersData.json";
import "./UI_Pages/teacher.css";
import { useNavigate } from "react-router-dom";

const Teachers = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const uniqueCourses = [
      ...new Set(teacherData.map((teacher) => teacher.course)),
    ];
    setCourses(uniqueCourses);
  }, []);
  const filteredTeacher = teacherData
    .filter((teacher) => {
      return (
        (!selectedCourse || teacher.course === selectedCourse) &&
        teacher.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    })
    .sort((a, b) => {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
  return (
    <div className="teacher-container">
      <header className="teacher-container-header">
        <img
          src="https://imgs.search.brave.com/rw0BtzCH0g5Naup9F_Tt_3yVuG83Zv9KlA9IJh6Ln84/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9zY2hv/b2wtbG9nby1vcGVu/LWJvb2stc3R1ZGVu/dC1zaWxob3VldHRl/LWtub3dsZWRnZS1l/ZHVjYXRpb24tc3lt/Ym9sLXVuaXZlcnNp/dHktbGlicmFyeS1i/b29rc3RvcmUtbG9n/b3R5cGUtdGVtcGxh/dGUtdmVjdG9yLTIx/Mzk0NjE5MS5qcGc"
          alt="college-Logo"
          className="logo"
        />
        <input
          type="text"
          placeholder="Search Teacher..."
          className="search-input"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </header>
      <div className="teacher-body-container">
        <aside className="courses-side">
          <ul>
            <li>
              <label>
                <input type="radio" name="course" />
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
        <main className="teachers-card-side">
          {filteredTeacher.map((teacher, index) => {
            return (
              <div className="teacher-card" key={index}>
                <img src={teacher.teacher_image} alt={teacher.name} />
                <h3>{teacher.name}</h3>
                <p className="position">{teacher.position}</p>
                <button
                  className="read-more"
                  onClick={() => navigate(`/teacher/${teacher.id}`)}
                >
                  Read More
                </button>
              </div>
            );
          })}
        </main>
      </div>
    </div>
  );
};

export default Teachers;
