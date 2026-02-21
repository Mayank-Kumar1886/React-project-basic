import React from "react";
import Counter from "./Counter";

const Stats = () => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <Counter end={1000}/>
            <p className="text-gray-600 mt-2">Homes Sold</p>
          </div>

          <div>
            <Counter end={500}/>
            <p className="text-gray-600 mt-2">Happy Clients</p>
          </div>

          <div>
            <Counter end={15} />
            <p className="text-gray-600 mt-2">Cities Covered</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-blue-600">24/7</h2>
            <p className="text-gray-600 mt-2">Customer Support</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
