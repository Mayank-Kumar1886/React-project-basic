import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("rentProperties")) || [];
    const found = data.find(p => String(p.id) === String(id));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProperty(found);
  }, [id]);

  if (!property) {
    return <div className="p-10 text-center">Property not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">{property.name}</h1>

        {property.featured && (
          <span className="bg-purple-600 text-white text-xs px-3 py-1 rounded-full">
            ★ FEATURED
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2">
          <img
            src={property.mainImage}
            alt={property.name}
            className="w-full h-[420px] object-cover rounded-2xl shadow"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {property.images?.slice(0, 4).map((img, i) => (
            <img
              key={i}
              src={img}
              alt="gallery"
              className="w-full h-[200px] object-cover rounded-xl shadow-sm"
            />
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Description</h2>
        <p className="text-gray-600 leading-relaxed">{property.para}</p>
      </div>

      <div className="mt-10 bg-white rounded-2xl shadow p-6">

        <h2 className="text-xl font-semibold mb-6">Property Details</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          <Detail label="City" value={property.city} />
          <Detail label="Location" value={property.location} />
          <Detail label="Night Rate" value={`${property.night_rate}`} />
          <Detail label="Bedrooms" value={property.bedroom} />
          <Detail label="Guests" value={property.guest} />
          <Detail label="Owner Email" value={property.email_owner} />
          <Detail label="Phone Number" value={property.phone_no} />

        </div>

        {/* ================= AMENITIES ================= */}
        <div className="mt-8">
          <h3 className="font-semibold mb-3">Amenities</h3>
          <div className="flex flex-wrap gap-3">
            {property.amenities?.map((a, i) => (
              <span
                key={i}
                className="bg-gray-100 text-sm px-3 py-1 rounded-full"
              >
                {a}
              </span>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

const Detail = ({ label, value }) => (
  <div>
    <p className="text-gray-400 text-sm">{label}</p>
    <p className="font-semibold">{value}</p>
  </div>
);

export default PropertyDetail;
