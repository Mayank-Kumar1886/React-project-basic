import React from "react";
import { useLoaderData } from "react-router-dom";
import Card from "../Components/UI/Card";

const Movie = () => {
  const movieData = useLoaderData();

  console.log(movieData)

  if (!movieData || !movieData.Search) {
    return <p>No movies found...</p>;
  }

  return (
    <ul className="container grid grid-four--cols">
      {movieData &&
        movieData.Search.map((movie) => {
          return <Card key={movie.imdbID} movie={movie} />;
        })}
    </ul>
  );
};

export default Movie;
