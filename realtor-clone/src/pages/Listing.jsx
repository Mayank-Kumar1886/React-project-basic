import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const Listing = () => {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [selectedAmenity, setSelectedAmenity] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [price, setPrice] = useState({ min: "", max: "" });

  // 🔹 Load data
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("rentProperties")) || [];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProperties(data);
    setFiltered(data);
  }, []);

  // 🔹 Extract amenities dynamically
  const amenitiesList = useMemo(() => {
    const set = new Set();
    properties.forEach(p =>
      p.amenities?.forEach(a => set.add(a)) // ✅ FIXED NAME
    );
    return [...set];
  }, [properties]);

  // 🔹 Extract locations dynamically
  const locationList = useMemo(() => {
    return [...new Set(properties.map(p => p.city))];
  }, [properties]);

  // 🔹 Filtering logic
  useEffect(() => {
    let result = [...properties];

    if (selectedAmenity) {
      result = result.filter(p =>
        p.amenities?.includes(selectedAmenity) // ✅ FIXED
      );
    }

    if (selectedLocation) {
      result = result.filter(p => p.city === selectedLocation);
    }

    if (price.min !== "") {
      result = result.filter(p => +p.night_rate >= +price.min);
    }

    if (price.max !== "") {
      result = result.filter(p => +p.night_rate <= +price.max);
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFiltered(result);
  }, [selectedAmenity, selectedLocation, price, properties]);

  return (
    <div className="px-10 py-6 bg-[#fafafa]">

      {/* FILTER BAR */}
      <div className="flex flex-wrap gap-4 mb-10 bg-white p-4 rounded-xl shadow">

        <select
          className="border rounded px-4 py-2"
          value={selectedAmenity}
          onChange={e => setSelectedAmenity(e.target.value)}
        >
          <option value="">All Amenities</option>
          {amenitiesList.map(a => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>

        <select
          className="border rounded px-4 py-2"
          value={selectedLocation}
          onChange={e => setSelectedLocation(e.target.value)}
        >
          <option value="">All Locations</option>
          {locationList.map(l => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Min Price"
          className="border rounded px-4 py-2 w-32"
          onChange={e => setPrice(p => ({ ...p, min: e.target.value }))}
        />
        <input
          type="number"
          placeholder="Max Price"
          className="border rounded px-4 py-2 w-32"
          onChange={e => setPrice(p => ({ ...p, max: e.target.value }))}
        />
      </div>

      {/* LISTINGS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {filtered.map(item => (
          <div
            key={item.id}
            onClick={() => navigate(`/property/${item.id}`)} // 
            className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
          >
            <div className="relative">
              <img
                src={item.mainImage}
                alt={item.name}
                className="w-full h-[220px] object-cover"
              />

              {item.featured && (
                <span className="absolute top-3 left-3 bg-purple-600 text-white text-xs px-3 py-1 rounded-full">
                  ★ FEATURED
                </span>
              )}
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.city}</p>

              <div className="flex flex-wrap gap-2 mt-3">
                {item.amenities?.slice(0, 3).map(a => (
                  <span
                    key={a}
                    className="text-xs bg-gray-100 px-2 py-1 rounded"
                  >
                    {a}
                  </span>
                ))}
              </div>

              <p className="mt-4 text-blue-600 font-bold">
                ${item.night_rate} <span className="text-sm font-normal">/ night</span>
              </p>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default Listing;
