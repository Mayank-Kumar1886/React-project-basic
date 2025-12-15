import React from "react";
import { FaStar } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
const Card = ({ img, title, star, reviews, prevPrice, newPrice }) => {
  return (
    <section className="card">
      <img src={img} alt={title} className="card-img" />
      <div className="card-details">
        <h3 className="card-title">{title}</h3>
        <section className="card-reviews">
          {[...Array(star)].map((_, index) => (
            <FaStar
              className="ratings-star"
              key={index}
              style={{ color: "gold" }}
            />
          ))}
          <span className="total-reviews">{reviews} </span>
        </section>
        <section className="card-price">
          <div className="price">
            <del>${prevPrice}</del> {newPrice}
          </div>
          <div className="bag">
            <FaBagShopping className="bag-icon" />
          </div>
        </section>
      </div>
    </section>
  );
};

export default Card;
