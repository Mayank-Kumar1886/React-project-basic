import React from "react";
import "./UIstyles/HeroSection.css";

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-left">
        <h1>
          "Here you can innovate your ideas integrating with technologies"
        </h1>
        <h1>
          "Education is the most powerful weapon which you can use to change the
          world."
        </h1>
        <p>— Nelson Mandela</p>
      </div>

      <div className="her-right">
        <img
          src="https://thumbs.dreamstime.com/b/group-college-students-28690355.jpg"
          alt="College image"
        />
      </div>
    </section>
  );
};

export default HeroSection;
