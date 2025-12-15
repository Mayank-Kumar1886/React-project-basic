import React, { useState } from "react";
import Navigation from "./Navigation/Nav.jsx";
import Products from "./products/Products.jsx";
import Recommended from "./Recommended/Recommended.jsx";
import Sidebar from "./Sidebar/Sidebar.jsx";
import Card from "./components/Card.jsx";
import products from "./db/data.js";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [query, setQuery] = useState("");
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredData = (products, selected, query) => {
    let filteredProducts = products;
    if (query) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (selected) {
      filteredProducts = filteredProducts.filter(
        ({ category, color, company, newPrice, title }) =>
          category === selected ||
          color === selected ||
          company === selected ||
          newPrice === selected ||
          title === selected
      );
    }
    return filteredProducts.map(
      ({ img, title, star, reviews, prevPrice, newPrice }) => (
        <Card
          key={Math.random() * 100000}
          img={img}
          title={title}
          star={star}
          reviews={reviews}
          prevPrice={prevPrice}
          newPrice={newPrice}
        />
      )
    );
  };
  const result = filteredData(products, selectedCategory, query);
  return (
    <>
      <Sidebar handleChange={handleChange} />
      <Navigation query={query} handleInputChange={handleInputChange} />
      <Recommended handleClick={handleClick} />
      <Products result={result} />
    </>
  );
};

export default App;
