import React from "react";
import { FaHome, FaUsers, FaHandshake, FaBuilding } from "react-icons/fa";
import FAQ from "../components/FAQ/FAQ";


const About = () => {
  return (
    <>
    
    <section className="bg-gray-50 min-h-screen">
      <div className="relative w-full h-[60vh]">
        <img
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa"
          alt="about"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-white text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About Our Property Platform
          </h1>
          <p className="max-w-2xl text-lg">
            We help people buy, sell, and rent properties with trust,
            transparency, and modern technology.
          </p>
        </div>
      </div>

      {/* ABOUT CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-6">
          Who We Are
        </h2>

        <p className="text-gray-600 text-center max-w-3xl mx-auto leading-7">
          Our platform is built to make property renting and selling simple,
          secure, and fast. Whether you are looking for your dream home or want
          to sell your property quickly, we provide powerful tools and a trusted
          marketplace to connect buyers and sellers.
        </p>

        {/* FEATURES */}
        <div className="grid md:grid-cols-4 gap-8 mt-14">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <FaHome className="text-3xl text-blue-600 mb-4" />
            <h3 className="font-semibold text-xl mb-2">Best Listings</h3>
            <p className="text-gray-500">
              Explore premium rental and sale properties with detailed
              information.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <FaUsers className="text-3xl text-blue-600 mb-4" />
            <h3 className="font-semibold text-xl mb-2">Trusted Users</h3>
            <p className="text-gray-500">
              Connect with verified buyers, sellers, and property owners easily.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <FaHandshake className="text-3xl text-blue-600 mb-4" />
            <h3 className="font-semibold text-xl mb-2">Secure Deals</h3>
            <p className="text-gray-500">
              Safe communication and transparent property transactions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <FaBuilding className="text-3xl text-blue-600 mb-4" />
            <h3 className="font-semibold text-xl mb-2">Modern Platform</h3>
            <p className="text-gray-500">
              Smart tools designed for today's real estate market.
            </p>
          </div>
        </div>
      </div>

      {/* MISSION SECTION */}
      <div className="bg-blue-600 text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
        <p className="max-w-3xl mx-auto text-lg">
          Our mission is to simplify property renting and selling by creating a
          reliable digital platform where users can explore, connect, and make
          confident decisions about real estate.
        </p>
      </div>

      {/* STATS SECTION */}
      <div className="max-w-5xl mx-auto py-16 px-6 grid md:grid-cols-3 gap-10 text-center">
        <div>
          <h3 className="text-4xl font-bold text-blue-600">500+</h3>
          <p className="text-gray-600 mt-2">Properties Listed</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold text-blue-600">200+</h3>
          <p className="text-gray-600 mt-2">Happy Clients</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold text-blue-600">50+</h3>
          <p className="text-gray-600 mt-2">Cities Covered</p>
        </div>
      </div>
    </section>
    <FAQ/>
    </>
  );
};

export default About;
