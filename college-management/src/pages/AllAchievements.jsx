import React, { useState } from "react";
import achievementData from "../api/achievementData.json";
import "./UI_Pages/allAchievements.css";

const AllAchievements = () => {
  const [likedItems, setLikedItems] = useState([]);

const toogleLike = (id) => {
  setLikedItems((prev) =>
    prev.includes(id)
      ? prev.filter((item) => item !== id)
      : [...prev, id]
  );
};
  return (
    <div className="all-achievement-wrapper">
      <h2 className="title">All Achievements</h2>
      <div className="achievement-list">
        {achievementData.map((achievement) => (
          <div className="achievement-row" key={achievement.id}>
            <img
              src={achievement.image}
              alt={achievement.event}
              className="ach-img"
            />
            <div className="ach-info">
              <h3>{achievement.event}</h3>
              <span
                className={`like-btn ${
                  likedItems.includes(achievement.id) ? "liked" : ""
                }`}
                onClick={() => toogleLike(achievement.id)}
              >
                {" "}
                {likedItems.includes(achievement.id) ? "❤️" : "🤍"}
              </span>
              <p>{achievement.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAchievements;
