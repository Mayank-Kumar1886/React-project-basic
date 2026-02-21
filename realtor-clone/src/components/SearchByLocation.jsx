import React from "react";

const locations = [
  {
    name: "Los Angeles",
    image: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade",
  },
  {
    name: "Phoenix",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",
  },
  {
    name: "Seattle",
    image: "https://images.unsplash.com/photo-1502175353174-a7a70e73b362",
  },
  {
    name: "Washington",
    image: "https://images.unsplash.com/photo-1506377585622-bedcbb027afc",
  },
];

const SearchByLocation = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold text-gray-800">
          Search By Location
        </h2>
        <button className="text-sm text-gray-500 hover:text-gray-800">
          &lt; SEE ALL LOCATIONS
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {locations.map((location, index) => (
          <div
            className="relative rounded-xl overflow-hidden group cursor-pointer"
            key={index}
          >
            <img
              src={location.image}
              alt={location.name}
              className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/30"></div>
            <p className="absolute bottom-4 left-4 text-white text-lg font-medium">
              {location.name}
            </p>
          </div>
        ))}
      </div>
      
    </section>
  );
};

export default SearchByLocation;
