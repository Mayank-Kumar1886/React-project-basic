import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const amenitiesOptions = [
  "Wifi",
  "Private Pool",
  "Ocean Access",
  "Parking",
  "Gym",
  "Air Conditioning",
  "Kitchen",
  "Pet Friendly",
];

const PropertyUpload = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    city: "",
    location: "",
    bedroom: "",
    guest: "",
    night_rate: "",
    email_owner: "",
    phone_no: "",
    para: "",
    mainImage: "",
    images: [],
    amenities: [],
    featured: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "amenities") {
      setForm((prev) => ({
        ...prev,
        amenities: checked
          ? [...prev.amenities, value]
          : prev.amenities.filter((a) => a !== value),
      }));
    } else if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImages = (e) => {
    const value = e.target.value;
    const arr = value.split(",").map((i) => i.trim());
    setForm((prev) => ({ ...prev, images: arr }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.images.length < 4) {
      alert("Please add minimum 4 images");
      return;
    }

    const existing =
      JSON.parse(localStorage.getItem("rentProperties")) || [];

    const newProperty = {
      ...form,
      id: Date.now(), 
    };

    const updated = [...existing, newProperty];

    localStorage.setItem("rentProperties", JSON.stringify(updated));

    navigate("/listings"); 
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Upload Property</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl shadow"
      >
        <Input label="Property Name" name="name" onChange={handleChange} />
        <Input label="City" name="city" onChange={handleChange} />
        <Input label="Location" name="location" onChange={handleChange} />
        <Input label="Bedrooms" name="bedroom" onChange={handleChange} />
        <Input label="Guests" name="guest" onChange={handleChange} />
        <Input label="Night Rate" name="night_rate" onChange={handleChange} />
        <Input label="Owner Email" name="email_owner" onChange={handleChange} />
        <Input label="Phone Number" name="phone_no" onChange={handleChange} />

        <Input
          label="Main Image URL"
          name="mainImage"
          onChange={handleChange}
        />

        <div className="md:col-span-2">
          <label className="text-sm font-semibold">
            Gallery Images (comma separated URLs - min 4)
          </label>
          <input
            className="border w-full p-2 rounded mt-1"
            onChange={handleImages}
          />
        </div>

        {/* DESCRIPTION */}
        <div className="md:col-span-2">
          <label className="text-sm font-semibold">
            Property Description (200 words)
          </label>
          <textarea
            name="para"
            rows={5}
            className="border w-full p-2 rounded mt-1"
            onChange={handleChange}
          />
        </div>

        {/* ⭐ Amenities Tag UI */}
        <div className="md:col-span-2">
          <p className="font-semibold mb-2">Amenities</p>
          <div className="flex flex-wrap gap-3">
            {amenitiesOptions.map((a) => (
              <label
                key={a}
                className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm"
              >
                <input
                  type="checkbox"
                  name="amenities"
                  value={a}
                  onChange={handleChange}
                />
                {a}
              </label>
            ))}
          </div>
        </div>

        

        <button className="md:col-span-2 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition">
          Upload Property
        </button>
      </form>
    </div>
  );
};

const Input = ({ label, name, onChange }) => (
  <div>
    <label className="text-sm font-semibold">{label}</label>
    <input
      name={name}
      className="border w-full p-2 rounded mt-1"
      onChange={onChange}
      required
    />
  </div>
);

export default PropertyUpload;
