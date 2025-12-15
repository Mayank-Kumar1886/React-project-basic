import React from "react";
import { NavLink } from "react-router-dom";

const CountryCard = ({ country }) => {
  const { flags, name, population, region, capital } = country;
  return (
    <li className="country-card card">
      <div className="container-card bg-white-box">
        <img src={flags.svg} alt={flags.svg} />

        <div className="countryInfo">
          <p className="card-title">
            {name.common.length > 10
              ? name.common.slice(0, 10) + "...."
              : name.common}
          </p>
          <p>
            <span className="card-description">Population:</span>
            {population.toLocaleString()}
          </p>
          <p>
            <span className="card-description">Region:</span>
            {region}
          </p>
          <p>
            <span className="card-description">Capital:</span>
            {capital && capital.length > 0 ? capital[0] : "N/A"}
          </p>
          <NavLink to={`/country/${name.common}`}>
            <button>Read more</button>
          </NavLink>
        </div>
      </div>
    </li>
  );
};

export default CountryCard;
