import React from "react";
import { FiMail, FiPhone, FiUser } from "react-icons/fi";

const InquireAboutListing = () => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c')",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 max-w-xl w-full text-center px-6">
        <h2 className="text-4xl font-semibold text-white mb-4">
          Inquire About A Listing
        </h2>
        <p className="text-gray-200 mb-10 leading-relaxed">
          Our team is here to promptly respond to your inquiries while
          accommodating your requests for viewing the property.
        </p>

        <form className="space-y-6">
          <div className="flex items-center bg-white rounded-full px-6 py-3">
            <FiUser className="text-gray-500 mr-3" />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full outline-none text-gray-700"
            />
          </div>
          <div className="flex items-center bg-white rounded-full px-6 py-4">
            <FiMail className="text-gray-500 mr-3" />
            <input
              type="email"
              placeholder="Email"
              className="w-full outline-none text-gray-700"
            />
          </div>
          <div className="flex items-center bg-white rounded-full px-6 py-4">
            <FiPhone className="text-gray-500 mr-3" />
            <input
              type="tel"
              placeholder="Phone"
              className="w-full outline-none text-gray-700"
            />
          </div>
          <button
            type="submit"
            className="mt-6 bg-purple-600 hover:bg-purple-700
                       text-white font-medium px-10 py-3 rounded-full
                       transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            SEND INQUIRE
          </button>
        </form>
      </div>
    </section>
  );
};

export default InquireAboutListing;
