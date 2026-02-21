import React from "react";
import {
  FiSearch,
  FiMail,
  FiArrowRight,
  FiUsers,
} from "react-icons/fi";
const HelpSection = () => {
  return (
    <section className="bg-white py-24">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center text-gray-900 mb-14">
          We're Here To Help
        </h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-gray-50 rounded-2xl px-8 py-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-6">
              <FiSearch className="text-3xl text-gray-800" />
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Discover</h4>
                <p className="text-gray-600 text-sm max-w-md">
                  With our intuitive search and filtering options, locating your
                  dream rental has never been easier
                </p>
              </div>
            </div>
            <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-black transition">
              VIEW RENTALS <FiArrowRight />
            </button>
          </div>
        

        <div className="flex items-center justify-between bg-gray-50 rounded-2xl px-8 py-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center gap-6">
            <FiMail className="text-3xl text-gray-800" />
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Inquire</h4>
              <p className="text-gray-600 text-sm max-w-md">
                Our dedicated team is here to answer any questions you may have
                and provide any additional information.
              </p>
            </div>
          </div>
          <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-black transition">
            INQUIRE TODAY <FiArrowRight />
          </button>
        </div>

        <div className="flex items-center justify-between bg-gray-50 rounded-2xl px-8 py-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center gap-6">
            <FiUsers className="text-3xl text-gray-800" />
            <div>
              <h4 className="font-medium text-gray-900 mb-1">List</h4>
              <p className="text-gray-600 text-sm max-w-md">
                No matter the type of property you own, our platform connects
                you with a global community of renters
              </p>
            </div>
          </div>
          <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-black transition">
            APPLY & EARN <FiArrowRight />
          </button>
        </div>
      </div>
      </div>
    </section>
  );
};

export default HelpSection;
