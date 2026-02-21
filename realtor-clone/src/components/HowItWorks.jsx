import React from "react";

const HowItWorks = () => {
  return (
    <section className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-semibold mb-4">How It Works</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            You can find detailed information about each property, including
            photos, amenities, and rental terms.
          </p>
        </div>
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-px bg-gray-300"></div>

          <div className="space-y-24">
             <div className="flex gap-6 items-start">
              <span className="text-5xl font-semibold text-gray-800">1</span>
              <div>
                <h3 className="text-lg font-medium mb-2">
                  Inquire About Any Rental
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Our dedicated team is here to answer any questions you may
                  have and provide any additional information.
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <span className="text-5xl font-semibold text-gray-800">2</span>
              <div>
                <h3 className="text-lg font-medium mb-2">
                  Guided Property Tour
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  During the tour, we’ll walk you through each area and key
                  elements that make our property special.
                </p>
              </div>
            </div>
          </div>
          <div className="hidden md:flex flex-col items-center justify-between py-8">
            <span className="w-3 h-3 bg-gray-700 rounded-full"></span>
            <span className="w-3 h-3 bg-gray-700 rounded-full"></span>
            <span className="w-3 h-3 bg-gray-700 rounded-full"></span>
            <span className="w-3 h-3 bg-gray-700 rounded-full"></span>
          </div>

          <div className="space-y-24">
            <div className="flex gap-6 items-start">
              <span className="text-5xl font-semibold text-gray-800">3</span>
              <div>
                <h3 className="text-lg font-medium mb-2">
                  Application Process
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Our team understands the importance of finding the right fit,
                  and we prioritize matching you with your ideal home.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <span className="text-5xl font-semibold text-gray-800">4</span>
              <div>
                <h3 className="text-lg font-medium mb-2">
                  Move In And Orientation
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Prior to your move-in date, we will arrange a time for you to
                  collect the keys and complete a move-in inspection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
