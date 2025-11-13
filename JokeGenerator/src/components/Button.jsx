import React from "react";

const Button = ({ fetchJoke }) => {
  return <button onClick={fetchJoke}>Click to generate a joke</button>;
};

export default Button;
