import React, { useEffect, useState } from "react";
import faq from "../../api/faq.json";
import FAQ from "../Layout/FAQ";

const Accordion = () => {
  const [data, setData] = useState([]);
  const [activeID, setActiveID] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setData(faq);
  }, []);
  const handleToggle = (id) => {
    setActiveID((prevId) => (prevId === id ? false : id));
  };
  return (
    <>
      <h1>The Accordion</h1>
      <ul className="section-accordion">
        {data &&
          data.map((current) => {
            const { id } = current;
            return (
              <FAQ
                key={id}
                currentData={current}
                isActive={activeID === id}
                onToggle={() => handleToggle(id)}
              />
            );
          })}
      </ul>
    </>
  );
};

export default Accordion;
