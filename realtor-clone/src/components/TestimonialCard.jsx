import React from "react";

const TestimonialCard = ({ message, image, name }) => {
  return (
    <div
      className="group relative bg-white rounded-2xl shadow-md p-8 text-center max-w-sm mx-auto
                    transition-all duration-300 ease-out
                    hover:-translate-y-3 hover:shadow-2xl"
    >
      <div
        className="text-5xl text-gray-300 mb-4
                      transition-transform duration-300
                      group-hover:scale-110 group-hover:text-gray-400"
      >
        “
      </div>
      <p className="text-gray-600 leading-relaxed mb-6 transition-colors duration-300 group-hover:text-gray-700">{message}</p>
      <h4 className="font-semibold text-gray-900 mb-10">{name}</h4>
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2
                   transition-transform duration-300
                   group-hover:scale-110">
        <img
          src={image}
          alt={name}
          className="w-16 h-16 rounded-full border-4 border-white object-cover shadow-lg"
        />
      </div>
    </div>
  );
};

export default TestimonialCard;
