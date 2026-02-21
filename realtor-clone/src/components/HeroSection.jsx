import React from "react";

const HeroSection = () => {
  return (
    <section className="max-w-6xl mx-auto py-16">
      <div className="flex flex-col md:flex-row items-center gap-15">
        <div className="md:w-1/2 flex flex-col items-start">
          <img
            src="https://images.unsplash.com/photo-1568605114967-8130f3a36994"
            alt="Luxury House"
            className="w-full h-[300px] object-cover rounded-2xl shadow-md
              transition-transform duration-500 ease-in-out
              group-hover:scale-105"
          />
          <button
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg
              transition-all duration-300 ease-in-out
              hover:bg-blue-700 hover:scale-105 hover:shadow-lg
              active:scale-95 cursor-pointer"
          >
            Explore Houses
          </button>
        </div>
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold mb-4">
            Buy & Sell Luxury Houses with Confidence
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed">
            Buying or selling a home is one of the most important decisions in
            life, and we are here to make that journey simple, transparent, and
            rewarding. Our platform connects buyers and sellers with premium
            residential properties, including luxury villas, modern apartments,
            and high-value investment homes. With verified listings, detailed
            property insights, and fair market pricing, you can confidently
            explore opportunities that match your lifestyle and budget.
            <br />
            <br />
            Whether you are a first-time home buyer, an experienced investor, or
            someone looking to sell property at the best value, we provide the
            tools and guidance you need at every step. From discovering the
            right location to closing the deal, our goal is to help you make
            informed decisions and turn your property dreams into reality.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
