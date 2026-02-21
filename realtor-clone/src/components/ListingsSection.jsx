import React from "react";
import ListingCard from "./ListingCard";

const ListingsSection = ({ title, linkText, listings }) => {
  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <button className="text-blue-600 hover:underline text-sm cursor-pointer ">
          {linkText}
        </button>
      </div>
      {listings.length === 0 ? (
        <div className="w-full text-center py-20">
          <p className="text-gray-500 text-lg font-medium">
            No house available for rent with selected filters
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 cursor-pointer">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ListingsSection;
