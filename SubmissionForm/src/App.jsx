import React, { use, useState } from "react";
import "./App.css";

const App = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [gender, setGender] = useState("male");
  const [subjects, setSubjects] = useState({
    english: true,
    maths: false,
    physics: false,
  });
  const [resume, setResume] = useState("");
  const [url, setUrl] = useState();
  const [selectedOption, setSelectedOption] = useState("");
  const [about, setAbout] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const handleReset = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setContact("");
    setGender("male");
    setSubjects({
      english: true,
      maths: false,
      physics: false,
    });
    setResume("");
    setUrl("");
    setSelectedOption("");
    setAbout("");
  };
  const handleSubjectChange = (subject) => {
    setSubjects((prevSubjects) => ({
      ...prevSubjects,
      [subject]: !prevSubjects[subject],
    }));
  };
  return (
    <div className="App">
      <h1>Submission Form</h1>
      <fieldset>
        <form action="#" method="get">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            placeholder="Enter First Name"
            name="firstName"
            id="firstName"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            required
          />
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            placeholder="Enter Last Name"
            name="lastName"
            id="lastName"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            placeholder="Enter Email Name"
            name="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <label htmlFor="telephone">Contact:</label>
          <input
            type="text"
            placeholder="Enter Phone Number"
            name="telephone"
            id="telephone"
            value={contact}
            onChange={(event) => setContact(event.target.value)}
            required
          />
          <label htmlFor="gender">Gender:</label>
          <input
            type="radio"
            name="gender"
            id="gender"
            value="male"
            checked={gender === "male"}
            onChange={(event) => setGender(event.target.value)}
          />
          Male
          <input
            type="radio"
            name="gender"
            id="gender"
            value="female"
            checked={gender === "female"}
            onChange={(event) => setGender(event.target.value)}
          />
          Female
          <input
            type="radio"
            name="gender"
            id="gender"
            value="other"
            checked={gender === "other"}
            onChange={(event) => setGender(event.target.value)}
          />
          Other
          <label htmlFor="language">Your Best Language</label>
          <input
            type="checkbox"
            name="language"
            id="english"
            checked={subjects.english === true}
            onChange={(event) => handleSubjectChange("english")}
          />
          English
          <input
            type="checkbox"
            name="language"
            id="maths"
            checked={subjects.maths === true}
            onChange={(event) => handleSubjectChange("maths")}
          />
          Maths
          <input
            type="checkbox"
            name="language"
            id="physics"
            checked={subjects.physics === true}
            onChange={(event) => handleSubjectChange("physics")}
          />
          Physics
          <label htmlFor="file">Upload Resume</label>
          <input
            type="file"
            id="file"
            name="file"
            placeholder="Upload File"
            onChange={(event) => setResume(event.target.files[0])}
            required
          />
          <label htmlFor="url">Enter URL*</label>
          <input
            type="url"
            name="url"
            id="url"
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter url"
            required
          />
          <label>Select your choice</label>
          <select
            name="select"
            id="select"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="" disabled selected={selectedOption === ""}>
              Select your Answer
            </option>
            <optgroup label="Beginners">
              <option value="1">HTML</option>
              <option value="1">CSS</option>
              <option value="1">Javascript</option>
              <option value="1">Java</option>
              <option value="1">Python</option>
              <option value="1">C++</option>
            </optgroup>
            <optgroup label="Intermediate">
              <option value="2">React</option>
              <option value="2">Angular</option>
              <option value="2">Vue</option>
              <option value="2">Django</option>
              <option value="2">Flask</option>
              <option value="2">Spring</option>
            </optgroup>
            <optgroup label="Advanced">
              <option value="3">Node.js</option>
              <option value="3">Express.js</option>
              <option value="3">GraphQL</option>
              <option value="3">NestJS</option>
              <option value="3">Ruby on Rails</option>
              <option value="3">ASP.NET</option>
            </optgroup>
          </select>
          <label htmlFor="about">About</label>
          <textarea
            name="about"
            id="about"
            cols="30"
            rows="10"
            placeholder="About"
            required
            onChange={(event) => setAbout(event.target.value)}
          ></textarea>
          <button type="reset" value="Reset" onClick={handleReset}>
            Reset
          </button>
          <button type="submit" value="Submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </fieldset>
    </div>
  );
};

export default App;
