import React, {  useState } from "react";
import Button from "./Button";

const Joke = () => {
  const [joke, setJoke] = useState("");
  const fetchJoke = () => {
    fetch("https://sv443.net/jokeapi/v2/joke/Programming?type=single")
      .then((response) => response.json())
      .then((data) => setJoke(data.joke));
  };

  return (
    <div className="joke">
      <Button fetchJoke={fetchJoke} />
      <p>{joke}</p>
    </div>
  );
};

export default Joke;
