import React from "react";

const FAQ = ({ currentData, isActive, onToggle }) => {
  const { question, answer } = currentData;
  return (
    <li>
      <div className="accordion-grid">
        <p className="accordion-question">{question}</p>
        <button onClick={onToggle} className={isActive ? "active-btn" : ""}>
          {isActive ? "close" : "show"}{" "}
        </button>
      </div>
      {isActive && <p>{answer}</p>}
    </li>
  );
};

export default FAQ;
