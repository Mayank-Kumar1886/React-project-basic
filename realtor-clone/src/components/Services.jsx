import React from "react";

const Services = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <div className="flex justify-center mb-4">
          <img
            src="https://cdn.prod.website-files.com/6492719dbfcc54669c62f0ea/64928b412b453df40f1c598c_service.webp"
            alt="hand with award floating icon"
            className="max-w-[60px] max-h-[60px] mr-[5px] static "
          ></img>
        </div>
        <h2 className="text-3xl font-semibold mb-3">Services</h2>
        <p className="text-gray-500 max-w-xl mx-auto mb-16">
          Our platform offers a wide variety of houses, giving customers plenty
          of options to choose from based on their budget.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <img
              src="https://cdn.prod.website-files.com/6492719dbfcc54669c62f0ea/64929e85379758884a498b2c_a%20dining%20room%20with%20a%20table%20and%20chairs.webp"
              alt="a dining room with a table and chairs"
              className="rounded-xl mb-6 w-full h-56 object-cover transition-transform duration-500 hover:scale-105 cursor-pointer"
            />
            <h3 className="text-lg font-medium mb-2">Fully Furnished</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Our fully furnished rental houses are equipped with everything you
              need, from appliances to furniture.
            </p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1501183638710-841dd1904471"
              alt="Accessible Locations"
              className="rounded-xl mb-6 w-full h-56 object-cover transition-transform duration-500 hover:scale-105 cursor-pointer"
            />
            <h3 className="text-lg font-medium mb-2">Accessible Locations</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              All our properties are located in prime areas to provide you with
              easy access to all necessary amenities.
            </p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1570129477492-45c003edd2be"
              alt="Competitive Prices"
              className="rounded-xl mb-6 w-full h-56 object-cover transition-transform duration-500 hover:scale-105 cursor-pointer"
            />
            <h3 className="text-lg font-medium mb-2">Competitive Prices</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              We offer affordable rental rates with no hidden charges for all
              our high-quality rental listings.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
