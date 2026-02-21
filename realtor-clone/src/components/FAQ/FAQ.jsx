import React, { useState } from "react";
import faqData from "../../data/faqData";
import FAQItem from "./FAQItem";

const FAQ = () => {
  const [activeId, setActiveId] = useState(null);

  const handleToggle = (id) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="bg-white py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Frequently Asked Questions
        </h2>

        <ul>
          {faqData.map((item) => (
            <FAQItem
              key={item.id}
              question={item.question}
              answer={item.answer}
              isActive={activeId === item.id}
              onToggle={() => handleToggle(item.id)}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;
