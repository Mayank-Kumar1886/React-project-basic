import React from "react";
import {
  FaCar,
  FaDumbbell,
  FaSnowflake,
  FaSwimmingPool,
  FaTshirt,
  FaTv,
  FaWifi,
} from "react-icons/fa";

const amenities = [
  { icon: <FaTv />, label: "TV" },
  { icon: <FaSnowflake />, label: "Air Conditioning" },
  { icon: <FaDumbbell />, label: "Gym" },
  { icon: <FaTshirt />, label: "Washing Machine" },
  { icon: <FaSwimmingPool />, label: "Pool" },
  { icon: <FaCar />, label: "Garage" },
  { icon: <FaWifi />, label: "Wifi" },
];

const DiscoverByAmenities = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24 text-center">
      <h2 className="text-3xl font-semibold text-gray-800 mb-3">
        Discover By Amenities
      </h2>
      <p className="text-gray-500 max-w-2xl mx-auto mb-16">
        You can find detailed information about each rental, including photos,
        amenities, location, and rental terms.
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-10">
        {amenities.map((item, index) => (
          <div
            className="flex flex-col items-center gap-3 text-gray-700 hover:text-black transition"
            key={index}
          >
            <div className="text-3xl">{item.icon}</div>
            <p className="text-sm">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DiscoverByAmenities;
