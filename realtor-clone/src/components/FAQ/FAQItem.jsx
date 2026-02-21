import React from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const FAQItem = ({ question, answer, isActive, onToggle }) => {
  return (
    <li className="border-b py-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={onToggle}
      >
        <h4 className="text-lg font-medium text-gray-900">
          {question}
        </h4>
        {isActive ? <FiChevronUp /> : <FiChevronDown />}
      </div>

      {isActive && (
        <p className="mt-3 text-gray-600 leading-relaxed">
          {answer}
        </p>
      )}
    </li>
  );
};

export default FAQItem;
