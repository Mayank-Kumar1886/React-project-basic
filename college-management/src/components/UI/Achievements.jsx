import React from "react";
import achievementData from "../../api/achievementData.json";
import Slider from "react-slick";
import "./UIstyles/Achievements.css";
import { useNavigate } from "react-router-dom";
const Achievements = () => {
  const featuredData = achievementData.filter(
    (item) => item.isFeatured === true
  );
  const navigate = useNavigate();

  const settings = {
    infinity: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    pauseOnHover: true,
    cssEase: "linear",
    dots: true,
  };
  return (
    <div className="achievement-wrapper">
      <h2 className="achievement-title">Featured Achievements</h2>
      <Slider {...settings}>
        {featuredData.map((featured) => {
          return (
            <div className="achievement-card" key={featured.id}>
              <img src={featured.image} alt={featured.event} />
              <h3>{featured.event}</h3>
              <button className="read-more">Read More</button>
            </div>
          );
        })}
      </Slider>
      <div className="more-events">
        <button
          className="more-event"
          onClick={() => navigate("/achievements")}
        >
          More Event
        </button>
      </div>
    </div>
  );
};

export default Achievements;
