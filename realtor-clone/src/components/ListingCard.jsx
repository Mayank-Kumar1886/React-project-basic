import React from "react";

const ListingCard = ({ listing }) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
      
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={listing.mainImage}
          alt={listing.name}
          className="h-48 w-full object-cover transition-transform duration-500 hover:scale-110"
        />

        {listing.featured && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
            FEATURED
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-sm text-gray-500 mb-1">
          📍 {listing.location}, {listing.city}
        </p>

        <h3 className="font-semibold text-lg mb-2">
          {listing.name}
        </h3>

        {/* Price */}
        <p className="text-blue-600 font-bold mb-2">
          ₹{listing.night_rate} / Night
        </p>

        {/* Details */}
        <div className="text-sm text-gray-600 flex gap-4">
          <span>{listing.bedroom} Beds</span>
          <span>{listing.guest} Guests</span>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
