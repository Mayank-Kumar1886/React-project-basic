import React, { useEffect, useState } from "react";
import "./App.css";
import PokemonCard from "./PokemonCard";

const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState('');
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");

  const API = "https://pokeapi.co/api/v2/pokemon?limit=124";
  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();

      const detailedPokemonData = data.results.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        const data = await res.json();
        return data;
      });

      const detailedResponses = await Promise.all(detailedPokemonData);
      setPokemon(detailedResponses);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error)
      setLoading(false)
    }
  };
  useEffect(() => {
    fetchPokemon();
  }, []);

  const searchData = pokemon.filter((currentCard)=>{
    return currentCard.name.toLowerCase().includes(search.toLowerCase())
  })

  if(loading){
    return (
        <div>
            <h1>Loading.....</h1>
        </div>
    )
  }
  if(error){
    return(
        <div>
            <h1>Error.......</h1>
        </div>
    )
  }
  return (
    <>
      <section className="container">
        <header>
          <h1>Lets Catch Pokemon</h1>
        </header>
        <div className="pokemon-search">
          <input
            type="text"
            placeholder="Search pokemon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          <ul className="cards">
            {searchData.map((current) => {
              return <PokemonCard key={current.id} pokemonData={current} />;
            })}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Pokemon;
