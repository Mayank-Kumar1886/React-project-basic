import React from "react";
import { FaRegComments } from "react-icons/fa";
import { testimonials } from "../data/testimonialsData";
import TestimonialCard from "./TestimonialCard";

const Testimonials = () => {
  return (
    <section
      className="relative py-24 bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c')",
      }}
    >
      <div className="text-center text-white mb-16">
        <FaRegComments className="mx-auto text-4xl mb-4" />
        <h2 className="text-3xl font-semibold">What People Are Saying..</h2>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">
        {testimonials.map((item) => (
          <TestimonialCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
