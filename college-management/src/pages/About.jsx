import React from "react";
import "./UI_Pages/about.css";
import aboutSliderImages from "../api/infraImages.json";
import Slider from "react-slick";

const About = () => {
  const { images } = aboutSliderImages;
  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
  };
  return (
    <div className="about-container">
      <div className="about-main">
        <div className="about-image">
          <img
            src="https://thumbs.dreamstime.com/b/hall-building-college-sunrise-63035568.jpg"
            alt=""
          />
        </div>
        <div className="about-content">
          <h1>About Our College</h1>
          <p className="description">
            Gold Institute of Technology was established in 1995 with a vision
            to deliver world-class technical education. Our campus is home to
            advanced laboratories, research centers, and a diverse learning
            environment focused on innovation and excellence.
          </p>
          <h2>📜 History</h2>
          <p>
            Established in 1995, the college started with just two engineering
            branches and a small faculty of experienced educators. With
            dedication and consistent academic excellence, it expanded rapidly.
            <br />
            <br />
            By the early 2000s, it became a recognized research institution with
            collaborations across industries. In the last decade, the institute
            added modern courses like AI, Cybersecurity, Robotics, and Data
            Science, becoming one of the leading technology institutes in the
            nation.
            <br />
            <br />
            Today, Gold Institute of Technology stands as a symbol of academic
            brilliance, innovation, and leadership development.
          </p>

          <h2>👨‍🏫 Teacher Facilities</h2>
          <ul>
            <li>Advanced faculty research labs</li>
            <li>Dedicated faculty cabins with digital systems</li>
            <li>Access to international journals & research tools</li>
            <li>Smart classrooms for teaching enhancement</li>
            <li>Faculty development programs (FDPs)</li>
            <li>Free campus Wi-Fi & cloud resources</li>
            <li>On-campus accommodation for senior faculty</li>
            <li>Collaboration opportunities with global universities</li>
          </ul>
          <h2>🎯 Mission</h2>
          <p>
            Our mission is to nurture highly skilled professionals by providing
            quality education, hands-on training, and modern technological
            exposure. We aim to build leaders who contribute to global
            innovation and social development.
          </p>

          <h2>🌏 Vision</h2>
          <p>
            To be recognized as a world-class institution in technology and
            innovation by promoting research, creativity, and sustainable
            learning practices that shape the next generation of global leaders.
          </p>

          <h2>⭐ Key Features</h2>
          <ul>
            <li>World-class laboratories</li>
            <li>Highly qualified faculty</li>
            <li>Industry-oriented curriculum</li>
            <li>Modern digital classrooms</li>
            <li>Active placements & internship programs</li>
          </ul>

          <h2>🛠 Technologies We Teach</h2>
          <ul>
            <li>Artificial Intelligence & Machine Learning</li>
            <li>Web Development & Cloud Computing</li>
            <li>Data Science & Big Data</li>
            <li>Cyber Security</li>
            <li>IoT & Robotics</li>
          </ul>

          <h2>🎓 Courses Offered</h2>
          <ul>
            <li>B.Tech in Computer Science Engineering</li>
            <li>B.Tech in Data Science</li>
            <li>B.Tech in Electronics & Communication</li>
            <li>M.Tech in Computer Engineering</li>
            <li>MBA in Technology Management</li>
          </ul>
        </div>
      </div>
      <div className="about-slider">
        <Slider {...settings}>
          {images.map((img, index) => {
            return (
              <div className="slider-image-wrapper" key={index}>
                <img
                  src={img}
                  alt={`College ${index}`}
                  className="slider-image"
                />
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default About;
